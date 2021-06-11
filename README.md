# Visualizer
Visualizes up to three 3D keypoint sequences that can be uploaded as a json file. The figures are visualized in a 3D scene in which you can navigate with mouse or touchpad. 


![alt text](https://github.com/deep-dance/visualizer/blob/main/SceneScreenshot.png)


## Options (in store.js)
addMinVal: bool </br>
<i>Adds the small y-position per frame to all keypoints so that the figure is always above the ground. </i>

slowMo: bool</br>
<i>True: 25 fps</i></br>
<i>False: 50 fps</i>



isPublicMode: bool</br>
<i>False: UI for JSON file upload for three figures. Upload for the red figure is necessary. </i></br>
<i>True: Default sequence is used. </i>

#### Route Parameters (only in PublicMode)
/0 - <i>Only red figure</i></br>
/1 - <i>Only yellow figure</i></br>
/2 - <i>Only blue figure</i></br>
/3 - <i>All figures</i></br>

## Dataformat Dance Sequences
Bones structure references to indices of key points in frames array.</br>
We used 17 Keypoints per frame with x,y and z coordinates.
```json
{
"bones": 
  {"rightLeg": [0, 1, 2, 3], 
  "leftLeg": [0, 4, 5, 6], 
  "spine": [0, 7, 8], 
  "rightArm": [8, 14, 15, 16], 
  "leftArm": [8, 11, 12, 13], 
  "head": [8, 9, 10]}, 
"frames": 
  {"0": [[-2.4441237449645996, -3.8527629375457764, 0.7843319773674011], 
        [-2.393502052873373, -3.9296287447214127, 0.782737439731136], 
        [-2.2857398949563503, -3.840653158724308, 0.42688069329597056], 
        [-2.3332251124083996, -3.766697645187378, 0.06645089969970286], 
        [-2.4949185885488987, -3.77601121366024, 0.7858672622824088], 
        [-2.42540517821908, -3.6984400004148483, 0.42004080454353243], 
        [-2.4022095557302237, -3.6513233594596386, 0.05276202003005892], 
        [-2.4273488465696573, -3.854808274656534, 0.9914256781339645], 
        [-2.395008286461234, -3.8247552774846554, 1.2214782983064651], 
        [-2.393197006545961, -3.75172121450305, 1.2646379955112934], 
        [-2.3797291349619627, -3.7744719702750444, 1.3619471602141857], 
        [-2.452534595504403, -3.7612639106810093, 1.1529337018728256], 
        [-2.4825645703822374, -3.7185510583221912, 0.9201748669147491], 
        [-2.4684247113764286, -3.7099071070551872, 0.7215456366539001], 
        [-2.346540266647935, -3.9117653854191303, 1.1755164861679077], 
        [-2.3565473705530167, -4.012718271464109, 0.9599731117486954], 
        [-2.362480844836682, -4.007626596838236, 0.7614489942789078]]
  }
}
```

