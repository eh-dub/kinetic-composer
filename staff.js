//************************
//*     Composly
//************************
//*         TODO
//* -Figure out how to turn staff into an instantiable object
//* -Key selection system
//* -Key display system
//* -Grid snapping system
//* -Selection of note type ( sixteenth, eigth, quarter, half, whole ) etc
//* -Accidental note notation

window.onload = function()
{

    var staff = function()
    {
        var __staff = {};
        var stageWidth = 900//config.stageWidth || 900,
        stageHeight = 600//config.stageWidth || 600;

        var stage = new Kinetic.Stage(
            {
                container: "draw-here",
                width: stageWidth,
                height:stageHeight
            });
        
        var staffLayer = new Kinetic.Layer();
        var noteCursorLayer = new Kinetic.Layer();
        var writtenNotesLayer = new Kinetic.Layer();
    
         
        var lineHeight = stageHeight/100;
        var lineSpace = (((stageHeight/2) - (lineHeight*5))/ 5)*.8; 
        //var lineSpace = 40;
        var startHeight = (stageHeight/2 - lineSpace*2.5) + - stageHeight/8;
        var noteRadius = lineSpace*.48;
    
        // Lines are counted from the bottom up
        var line = new Kinetic.Line(
            {
                points: [ 10, startHeight, 890, startHeight ],
                lineCap: 'round',
                lineJoin: 'round',
                stroke: 'black',
                strokeWidth: lineHeight
            });
        
        var guideLine = new Kinetic.Line(
            {
                points: [10, startHeight + lineSpace/2, 890, startHeight + lineSpace/2 ],
                lineCap: 'round',
                lineJoin: 'round',
                stroke: 'blue',
                strokeWidth: lineHeight
            });
     
        var invisibleLine = new Kinetic.Line(
            {
                points: [10, startHeight + lineSpace/2, 890, startHeight + lineSpace/2 ],
                lineCap: 'round',
                lineJoin: 'round',
                stroke: 'white',
                strokeWidth: lineHeight
            }); 
            
        // On click callback for note cursor -- writes note
        var noteCursorOnClick = function()
        {
            var activeNote = stage.find( '.active-note' )[0],
                writtenNote = activeNote.clone();
                
            writtenNote.setName( '' );
                
            writtenNotesLayer.add( writtenNote );
            writtenNotesLayer.draw();
        }
      
        var noteCursor = new Kinetic.Ellipse( 
                {
                    radius: { x: 1.5*noteRadius, y: noteRadius }, 
                    x: 0,
                    y: 0,
                    stroke: 'black',
                    fill: 'grey',
                    name: 'active-note'
                });
                
        noteCursor.on( 'mousedown touchdown', noteCursorOnClick );
                    
        // Set initial y-coordinate for generated callbacks
        var lineY = line.getPoints()[0].y;
        var invisibleLineY = invisibleLine.getPoints()[0].y;

        // Create staff
        for ( var i = 0; i < 5; i++ )
        {
            var visibleMouseOverCallback = function()
            {
                var ellipseY = lineY,
                    stagePortable = stage;
                return function()
                {
                    var mousePos = stagePortable.getMousePosition();
                    noteCursorLayer.clear();
                    noteCursor.setX( mousePos.x - noteRadius);
                    noteCursor.setY( ellipseY );
                    noteCursorLayer.add( noteCursor );
                    guideLine.setPoints( [10, -50, 890, -50] );
                    noteCursorLayer.draw();
                    console.log( 'callback: ellipseY = ' + ellipseY );
                }
            }();
                
            
            var invisibleMouseOverCallback = function()
            {
                var ellipseY = invisibleLineY,
                    stagePortable = stage;
                return function()
                {
                    var mousePos = stagePortable.getMousePosition();
                    
                    noteCursorLayer.clear();
                    noteCursor.setX( mousePos.X - noteRadius);
                    noteCursor.setY( ellipseY );
                    noteCursorLayer.add( guideLine );
                    noteCursorLayer.add( noteCursor );
                    guideLine.setPoints( [10, ellipseY, 890, ellipseY] );
                    noteCursorLayer.draw();
                    console.log( 'callback: ellipseY = ' + ellipseY );
                }
            }();
            
            // Register event handler
            line.on( "mouseover touchdown", visibleMouseOverCallback );
            invisibleLine.on( "mouseover touchdown", invisibleMouseOverCallback );
        
            // Add line to layer
            staffLayer.add( line );
            staffLayer.add( invisibleLine );
            
            // Clone new line object
            line = line.clone();
            invisibleLine = invisibleLine.clone();
            
            // De-register cloned event handler
            line.off( 'mouseover touchdown' );
            invisibleLine.off( 'mouseover touchdown' );
            
            // Translate reference line
            line.move( { x: 0, y: lineSpace } );
            invisibleLine.move( { x: 0, y: lineSpace } );
            
            // Hack
            lineY = lineY + lineSpace;
            invisibleLineY = invisibleLineY + lineSpace;
            console.log( line.getOffsetY() );
        }
        
            
           __staff.start = function()
           {
                stage.add( staffLayer );
                stage.add( noteCursorLayer );
                stage.add( writtenNotesLayer );
           }
           
           return __staff;
    }()
    
    staff.start(  );
    
}