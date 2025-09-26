import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);
const router = express.Router();

// Configuration multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Vérifier que c'est une image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont acceptés'));
    }
  }
});

/**
 * POST /api/steganography
 * Cacher ou révéler un message dans une image
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { mode, message } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        error: 'Aucun fichier image fourni'
      });
    }

    if (!mode || !['hide', 'reveal'].includes(mode)) {
      return res.status(400).json({
        success: false,
        error: 'Mode invalide. Utilisez "hide" ou "reveal"'
      });
    }

    const imagePath = imageFile.path;
    const pythonScriptPath = path.join(process.cwd(), 'scripts', 'steg.py');

    // Vérifier que le script Python existe
    try {
      await fs.access(pythonScriptPath);
    } catch {
      return res.status(500).json({
        success: false,
        error: 'Script de stéganographie non trouvé'
      });
    }

    if (mode === 'hide') {
      if (!message || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Message requis pour le mode "hide"'
        });
      }

      // Générer le nom du fichier de sortie
      const outputPath = path.join(
        path.dirname(imagePath),
        `steganography_${uuidv4()}.png`
      );

      try {
        // Exécuter le script Python pour cacher le message
        const pythonExecutable = process.env.PYTHON_EXECUTABLE || 'python';
        const command = `"${pythonExecutable}" "${pythonScriptPath}" hide -i "${imagePath}" -o "${outputPath}" -m "${message.replace(/"/g, '\\"')}"`;
        const { stdout, stderr } = await execAsync(command);

        console.log('Stéganographie hide stdout:', stdout);
        if (stderr) {
          console.warn('Stéganographie hide stderr:', stderr);
        }

        // Vérifier que le fichier de sortie a été créé
        await fs.access(outputPath);

        // Créer l'URL de téléchargement
        const filename = path.basename(outputPath);
        const downloadUrl = `/api/steganography/download/${filename}`;

        // Nettoyer le fichier d'entrée
        await fs.unlink(imagePath);

        res.json({
          success: true,
          message: 'Message caché avec succès',
          filename,
          downloadUrl
        });

      } catch (error) {
        console.error('Erreur lors du cachage:', error);
        
        // Nettoyer les fichiers en cas d'erreur
        try {
          await fs.unlink(imagePath);
        } catch {}

        res.status(500).json({
          success: false,
          error: 'Erreur lors du traitement de l\'image'
        });
      }

    } else if (mode === 'reveal') {
      try {
        // Exécuter le script Python pour révéler le message
        const pythonExecutable = process.env.PYTHON_EXECUTABLE || 'python';
        const command = `"${pythonExecutable}" "${pythonScriptPath}" reveal -i "${imagePath}"`;
        const { stdout, stderr } = await execAsync(command);

        console.log('Stéganographie reveal stdout:', stdout);
        if (stderr) {
          console.warn('Stéganographie reveal stderr:', stderr);
        }

        // Analyser la sortie pour extraire le message
        let revealedMessage = null;
        const lines = stdout.split('\n');
        
        // Chercher le message après "Message trouvé :"
        const messageStartIndex = lines.findIndex(line => line.includes('Message trouvé :'));
        if (messageStartIndex !== -1 && messageStartIndex + 2 < lines.length) {
          revealedMessage = lines.slice(messageStartIndex + 2).join('\n').trim();
        }

        // Nettoyer le fichier d'entrée
        await fs.unlink(imagePath);

        res.json({
          success: true,
          message: revealedMessage || null
        });

      } catch (error) {
        console.error('Erreur lors de la révélation:', error);
        
        // Nettoyer le fichier en cas d'erreur
        try {
          await fs.unlink(imagePath);
        } catch {}

        res.status(500).json({
          success: false,
          error: 'Erreur lors de l\'analyse de l\'image'
        });
      }
    }

  } catch (error) {
    console.error('Erreur API stéganographie:', error);
    
    // Nettoyer le fichier si il existe
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch {}
    }

    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

/**
 * GET /api/steganography/download/:filename
 * Télécharger une image avec message caché
 */
router.get('/download/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Sécurité: vérifier que le nom de fichier ne contient pas de chemins relatifs
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        error: 'Nom de fichier invalide'
      });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    // Vérifier que le fichier existe
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Fichier non trouvé'
      });
    }

    // Définir les headers pour le téléchargement
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'image/png');

    // Envoyer le fichier
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Erreur envoi fichier:', err);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            error: 'Erreur lors du téléchargement'
          });
        }
      } else {
        // Supprimer le fichier après téléchargement
        setTimeout(async () => {
          try {
            await fs.unlink(filePath);
            console.log(`Fichier temporaire supprimé: ${filename}`);
          } catch (error) {
            console.warn(`Impossible de supprimer le fichier temporaire: ${filename}`, error);
          }
        }, 5000); // Attendre 5 secondes avant suppression
      }
    });

  } catch (error) {
    console.error('Erreur téléchargement:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

/**
 * GET /api/steganography/info
 * Informations sur l'API de stéganographie
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    info: {
      description: 'API de stéganographie pour cacher/révéler des messages dans des images',
      modes: ['hide', 'reveal'],
      supportedFormats: ['PNG', 'JPG', 'JPEG'],
      maxFileSize: '10MB',
      method: 'LSB (Least Significant Bit)'
    }
  });
});

export default router;