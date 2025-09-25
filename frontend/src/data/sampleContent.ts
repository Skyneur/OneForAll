import type { SurvivalGuide } from '../types';

export const sampleContent: SurvivalGuide = {
  title: "Guide de Survie Apocalyptique",
  description: "Un guide complet pour survivre en milieu hostile",
  version: "1.0.0",
  lastUpdated: new Date(),
  categories: [
    {
      id: "shelter",
      name: "Abri & Protection",
      description: "Construction et aménagement d'abris de fortune",
      icon: "home",
      color: "#ff6b35",
      chapters: [
        {
          id: "shelter-basics",
          title: "Bases de la Construction d'Abri",
          content: `# Construire un Abri de Survie

## Principes Fondamentaux

La construction d'un abri est votre **première priorité** en situation de survie. Un bon abri vous protège des éléments et maintient votre température corporelle.

### Règle des 3
- 3 minutes sans air
- 3 heures sans abri (par temps extrême)
- 3 jours sans eau
- 3 semaines sans nourriture

## Types d'Abris d'Urgence

### 1. Abri Lean-To (Appentis)
L'abri le plus simple et rapide à construire :

\`\`\`
Matériaux nécessaires :
- 1 branche maîtresse (3-4 mètres)
- Branches secondaires
- Feuillage dense
- Cordes ou lianes
\`\`\`

**Étapes de construction :**
1. Trouvez ou coupez une branche solide de 3-4 mètres
2. Appuyez une extrémité contre un arbre à 1 mètre de hauteur
3. Fixez l'autre extrémité au sol avec des pierres
4. Disposez des branches perpendiculairement le long de la branche maîtresse
5. Couvrez avec du feuillage dense, de bas en haut

> Construisez toujours votre abri dos au vent dominant et sur un terrain légèrement en pente pour l'évacuation de l'eau.

### 2. Abri en A (A-Frame)
Plus stable que le lean-to, idéal par mauvais temps :

**Avantages :**
- Excellente résistance au vent
- Meilleure isolation
- Plus d'espace au sol

**Construction :**
1. Placez une branche faîtière entre deux supports
2. Appuyez des branches de chaque côté pour former un "A"
3. Renforcez avec des branches horizontales
4. Couvrez complètement de feuillage

## Isolation et Confort

### Isolation du Sol
Le sol peut voler 25% de votre chaleur corporelle :
- Utilisez des branches de pin/épicéa
- Créez un matelas de 15-20 cm d'épaisseur
- Remplacez régulièrement l'isolation humide

### Protection contre l'Eau
- Pente minimale de 30° pour l'évacuation
- Gouttières avec des branches
- Tranchée de drainage autour de l'abri

## Erreurs Courantes à Éviter

❌ **Construire dans une cuvette** (risque d'inondation)
❌ **Sous-estimer l'isolation du sol**
❌ **Négliger la ventilation**
❌ **Construire trop grand** (perte de chaleur)

✅ **Construire sur terrain surélevé**
✅ **Isoler généreusement**
✅ **Prévoir une évacuation d'air**
✅ **Taille adaptée à votre corps**`,
          order: 1,
          category: "shelter",
          tags: ["construction", "urgence", "protection"],
          lastUpdated: new Date()
        },
        {
          id: "shelter-advanced",
          title: "Abris Avancés et Fortifications",
          content: `# Abris Avancés et Fortifications

## Construction Long Terme

Après avoir sécurisé un abri temporaire, vous pouvez améliorer votre installation pour un séjour prolongé.

### Abri Semi-Permanent
Construction plus robuste pour plusieurs semaines :

**Matériaux :**
- Troncs de diamètre 10-15cm
- Argile ou boue
- Pierres plates
- Mousse et feuillage

### Techniques de Fortification

#### Murs en Torchis
Mélange terre-paille très efficace :
1. Creusez une tranchée de fondation (30cm)
2. Placez des pierres de drainage
3. Montez un cadre en branches
4. Appliquez le torchis en couches

> Le torchis sèche mieux par temps sec. Protégez votre construction de la pluie pendant le séchage.

#### Toiture Étanche
- Écorce de bouleau (excellent isolant)
- Bardeaux de bois
- Chaume serré
- Membrane d'argile

## Aménagement Intérieur

### Zone de Couchage
- Surélevée de 20cm minimum
- Isolée avec des fourrures ou feuillage
- Protégée des courants d'air

### Zone de Stockage
- Étagères en branches
- Cache alimentaire surélevée
- Protection contre les rongeurs

### Cheminée et Évacuation
Construction d'une cheminée simple :
1. Conduit en pierres plates
2. Évacuation vers l'extérieur
3. Clapet de tirage avec écorce

## Camouflage et Discrétion

### Techniques de Camouflage
- Utilisez les matériaux locaux
- Évitez les lignes droites
- Mimez la végétation environnante
- Réduisez la signature thermique

### Entrées Multiples
- Entrée principale camouflée
- Sortie de secours dissimulée
- Passage pour observation

## Maintenance et Amélioration

### Contrôles Réguliers
- Vérifiez l'étanchéité après chaque pluie
- Remplacez l'isolation humide
- Renforcez les points faibles
- Nettoyez les évacuations d'eau

### Évolutions Saisonnières
- **Été** : Ventilation maximale
- **Hiver** : Isolation renforcée
- **Pluie** : Drainage optimisé
- **Vent** : Renforcements structurels`,
          order: 2,
          category: "shelter",
          tags: ["construction", "long-terme", "fortification"],
          lastUpdated: new Date()
        }
      ]
    },
    {
      id: "water",
      name: "Eau & Purification",
      description: "Trouver, purifier et stocker l'eau potable",
      icon: "shield",
      color: "#3b82f6",
      chapters: [
        {
          id: "water-sources",
          title: "Sources d'Eau Naturelles",
          content: `# Trouver de l'Eau en Milieu Naturel

## Priorité Absolue
L'eau est votre deuxième priorité après l'abri. Le corps humain peut survivre 3 jours sans eau dans des conditions normales.

## Sources d'Eau Naturelles

### Cours d'Eau
**Rivières et ruisseaux :**
- Privilégiez l'eau courante
- Évitez les zones stagnantes
- Prélevez en amont des activités humaines

**Indices pour trouver un cours d'eau :**
- Suivre les traces d'animaux
- Écouter le bruit de l'eau
- Observer la végétation plus dense
- Chercher dans les vallées

### Sources et Résurgences
Les meilleures sources d'eau naturelle :
- Eau généralement plus pure
- Température constante
- Débit régulier
- Moins de contamination

> Testez toujours l'eau d'une source : si elle n'a pas de goût métallique et que la végétation autour est saine, c'est bon signe.

### Collecte d'Eau de Pluie
Système simple et efficace :

\`\`\`
Matériel nécessaire :
- Bâche, tissu ou grandes feuilles
- Contenants (gourdes, récipients)
- Cordages pour tendre la bâche
\`\`\`

**Installation :**
1. Tendez la bâche en pente
2. Créez un point de collecte
3. Placez un récipient en dessous
4. Nettoyez la surface avant utilisation

## Eau Souterraine

### Puits de Fortune
Creuser un puits simple :
1. Trouvez une zone humide (près d'un cours d'eau asséché)
2. Creusez un trou de 1m x 1m
3. Descendez jusqu'à trouver l'eau
4. Stabilisez les parois avec des pierres

### Collecteur de Rosée
Technique pour climats arides :
- Utilisez un tissu propre
- Étendez-le sur l'herbe au petit matin
- Essorez l'eau collectée
- Répétez l'opération

## Indices de Présence d'Eau

### Observation de la Faune
- **Oiseaux** : volent vers l'eau matin et soir
- **Insectes** : nuages de moustiques
- **Mammifères** : traces convergeant vers un point
- **Abeilles** : ne s'éloignent jamais de plus de 6km de l'eau

### Signes Végétaux
- Végétation plus verte et dense
- Saules, peupliers, roseaux
- Mousse sur les rochers
- Fougères en abondance

## Méthodes de Collecte d'Urgence

### Distillation Solaire
Construction d'un alambic solaire :
1. Creusez un trou conique de 1m de diamètre
2. Placez un récipient au centre
3. Remplissez de végétation humide
4. Couvrez d'un plastique transparent
5. Placez une pierre au centre du plastique
6. L'eau s'évapore et retombe dans le récipient

### Transpiration des Plantes
Collecte de l'eau des feuilles :
1. Placez un sac plastique sur une branche feuillue
2. Fermez hermétiquement avec une corde
3. Placez un coin du sac vers le bas
4. L'eau de transpiration s'accumule dans le coin

## Signaux d'Alarme

⚠️ **Évitez ces sources :**
- Eau stagnante verdâtre
- Présence d'animaux morts à proximité
- Odeur forte ou inhabituelle
- Mousse colorée à la surface
- Absence totale de vie aquatique`,
          order: 1,
          category: "water",
          tags: ["sources", "collecte", "recherche"],
          lastUpdated: new Date()
        }
      ]
    },
    {
      id: "fire",
      name: "Feu & Chaleur",
      description: "Techniques d'allumage et maintenance du feu",
      icon: "zap",
      color: "#dc2626",
      chapters: [
        {
          id: "fire-basics",
          title: "Allumer un Feu Sans Allumettes",
          content: `# Allumer un Feu Sans Allumettes

## L'Importance du Feu
Le feu vous permet de :
- Vous réchauffer et sécher vos vêtements
- Cuire la nourriture et purifier l'eau
- Signaler votre position
- Éloigner les prédateurs
- Améliorer votre moral

## Triangle du Feu
Pour qu'un feu prenne et se maintienne, il faut :

1. **Combustible** (bois, papier, tissu)
2. **Comburant** (oxygène)
3. **Chaleur** (étincelle, flamme)

## Préparation du Matériel

### Amadou (Tinder)
Matières qui s'enflamment facilement :
- Écorce de bouleau sèche
- Herbe sèche fine
- Mousse de chêne
- Copeaux de bois résineux
- Duvet de pissenlit
- Fil de champignon amadouvier

### Petit Bois (Kindling)
Branches de la taille d'un crayon à celle du pouce :
- Bois mort et sec
- Branches basses des conifères
- Éclats de bois résineux

### Bois de Chauffage
Branches plus grosses pour maintenir le feu :
- Bois dur pour les braises (chêne, hêtre)
- Bois tendre pour les flammes (pin, épicéa)

## Méthodes d'Allumage Primitives

### Friction par Archet
Technique efficace mais demande de la pratique :

**Matériel nécessaire :**
- Planche de base (bois tendre et sec)
- Fuseau (bois dur)
- Archet (branche courbée + corde)
- Plaquette de pression

**Technique :**
1. Creusez une encoche en V dans la planche
2. Placez l'amadou sous l'encoche
3. Faites tourner le fuseau avec l'archet
4. Augmentez progressivement la vitesse
5. Soufflez délicatement sur les braises

> La fumée blanche indique que vous êtes sur la bonne voie. Continuez jusqu'à voir des braises rougeoyantes.

### Friction par Planchette
Méthode simple mais fatigante :
1. Frottez deux morceaux de bois sec
2. Utilisez un mouvement de va-et-vient rapide
3. Créez une rainure dans le bois du dessous
4. Continuez jusqu'à formation de braises

### Pierre et Acier (Briquet)
Avec un silex et de l'acier :
1. Tenez le silex fermement
2. Frappez avec l'acier en angle aigu
3. Dirigez les étincelles vers l'amadou
4. Soufflez doucement pour attiser

## Construction du Foyer

### Structure en Tipi
Arrangement classique et efficace :
1. Placez l'amadou au centre
2. Disposez le petit bois en tipi autour
3. Ajoutez du bois plus gros à l'extérieur
4. Laissez des espaces pour l'air

### Structure en Cabane
Pour un feu de longue durée :
1. Placez deux grosses bûches parallèles
2. Construisez des couches perpendiculaires
3. Allumez par le haut
4. Le feu descend lentement

### Feu en Étoile
Économique en combustible :
1. Disposez 5-6 bûches en étoile
2. Allumez au centre
3. Poussez les bûches vers le centre
4. Contrôlez l'intensité facilement

## Allumage et Maintenance

### Séquence d'Allumage
1. Préparez tous vos matériaux AVANT
2. Protégez votre amadou du vent
3. Allumez l'amadou avec votre source
4. Ajoutez progressivement du petit bois
5. Passez au bois de chauffage

### Maintenir le Feu
- Alimentez régulièrement en combustible
- Remuez les braises pour aviver
- Gardez du bois sec en réserve
- Protégez des intempéries

## Sécurité

⚠️ **Précautions importantes :**
- Dégagez un périmètre de 3 mètres
- Ayez toujours de l'eau à proximité
- Ne laissez jamais un feu sans surveillance
- Éteignez complètement avant de partir
- Vérifiez qu'il ne reste aucune braise`,
          order: 1,
          category: "fire",
          tags: ["allumage", "friction", "sécurité"],
          lastUpdated: new Date()
        }
      ]
    }
  ]
};