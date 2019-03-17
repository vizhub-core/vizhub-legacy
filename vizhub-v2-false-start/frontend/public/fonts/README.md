The monospace font used for code, 'Ubuntu Mono Ligaturized',
a mashup of Ubuntu Mono with the fat arrow ligature from FiraCode
created using https://github.com/ToxicFrog/Ligaturizer/

 * The file ligatures.py was modified to only include the arrow ligature.
 * The file ligaturize.py was modified to correct for vertical alignment
   by adding the following to line 126 (inside correct_ligature_width):
   glyph.transform(psMat.translate(0, -48))
   This makes the ligatures align with existing characters (e.g. '=').
