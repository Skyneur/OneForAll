#!/usr/bin/env python3
# steg.py - cache/extrait un message texte dans une image (utilise Stegano LSB)

import argparse
import sys
from stegano import lsb
from PIL import Image

def hide(input_image_path: str, output_image_path: str, message: str):
    # Vérifier que l'image s'ouvre
    try:
        Image.open(input_image_path)
    except Exception as e:
        print(f"Erreur : impossible d'ouvrir l'image '{input_image_path}': {e}")
        sys.exit(1)

    # Cacher le message
    try:
        secret_image = lsb.hide(input_image_path, message)
        secret_image.save(output_image_path)
        print(f"Message caché avec succès dans : {output_image_path}")
    except Exception as e:
        print("Erreur lors du cachage :", e)
        sys.exit(1)

def reveal(image_path: str):
    try:
        revealed = lsb.reveal(image_path)
        if revealed is None:
            print("Aucun message trouvé (ou message vide).")
        else:
            print("Message trouvé :\n")
            print(revealed)
    except Exception as e:
        print("Erreur lors de l'extraction :", e)
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Cacher / extraire un message dans une image (Stegano LSB).")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_hide = sub.add_parser("hide", help="Cacher un message dans une image")
    p_hide.add_argument("-i", "--in", dest="input", required=True, help="Image d'entrée (png/jpg)")
    p_hide.add_argument("-o", "--out", dest="output", required=True, help="Image de sortie (ex: out.png)")
    p_hide.add_argument("-m", "--message", dest="message", required=False, help="Message à cacher. Si absent, le lira depuis stdin.")

    p_reveal = sub.add_parser("reveal", help="Extraire un message d'une image")
    p_reveal.add_argument("-i", "--in", dest="input", required=True, help="Image à analyser")

    args = parser.parse_args()

    if args.cmd == "hide":
        msg = args.message
        if not msg:
            print("Tape ton message puis Ctrl+D (Linux/mac) ou Ctrl+Z puis Entrée (Windows) :")
            msg = sys.stdin.read().rstrip("\n")
        if not msg:
            print("Erreur : message vide.")
            sys.exit(1)
        hide(args.input, args.output, msg)
    elif args.cmd == "reveal":
        reveal(args.input)

if __name__ == "__main__":
    main()