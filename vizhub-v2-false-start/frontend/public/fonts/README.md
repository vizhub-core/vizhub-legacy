The monospace font used for code, 'Ubuntu Mono Ligaturized',
a mashup of Ubuntu Mono with the fat arrow ligature from FiraCode
created using https://github.com/ToxicFrog/Ligaturizer/

# Arrowize

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

# Vertical Correction

To correct for vertical alignment by adding the following to line 126 (inside `correct_ligature_width`):

`ligaturize.py`

For Ubuntu Mono:

```
glyph.transform(psMat.translate(0, -48))
```

For Inconsolata-g:

```
glyph.transform(psMat.translate(0, 42))
```

This makes the ligatures align with existing characters (e.g. '=') for Ubuntu Mono.

# Character Copying

For the Ligaturized variants, we copy the following characters so that in particular the <>, />, and __ ligatures look good:

`ligatures.py` from line 5

```
    {   
        'chars': [
            'greater', 'less', 'underscore'
        ],  
        'firacode_ligature_name': None,
    },  
```

To enable:

`build.py` line 14

```
COPY_CHARACTER_GLYPHS = True
```

# TTF to WOFF Conversion

```
ttf2woff ./UbuntuMonoLigaturized-Regular.ttf UbuntuMonoLigaturized.woff
```
