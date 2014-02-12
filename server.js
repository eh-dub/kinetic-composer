var express = require( 'express' ),
    logfmt = require( 'logfmt' ),
    app = express();
    
    
app.use( logfmt.requestLogger() );  // heroku-suggested logger
app.use( express.static( __dirname ) ); // serve files in root directory

var port = Number( process.env.PORT || 18000 );
app.listen( port, function()
{
    console.log( 'server listening on port:' + port );
});
    
