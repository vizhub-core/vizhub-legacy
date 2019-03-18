The monospace font used for code, 'Ubuntu Mono Ligaturized',
a mashup of Ubuntu Mono with the fat arrow ligature from FiraCode
created using https://github.com/ToxicFrog/Ligaturizer/

To only include the arrow ligature:

`ligatures.py`

```
ligatures = [
    {   # =>
        'chars': ['equal', 'greater'],
        'firacode_ligature_name': 'equal_greater.liga',
    }
]
```

To correct for vertical alignment by adding the following to line 126 (inside `correct_ligature_width`):

`ligaturize.py`

```
glyph.transform(psMat.translate(0, -48))
```

This makes the ligatures align with existing characters (e.g. '=') for Ubuntu Mono.

WOFF conversion:

```
ttf2woff ./UbuntuMonoLigaturized-Regular.ttf UbuntuMonoLigaturized.woff
```
