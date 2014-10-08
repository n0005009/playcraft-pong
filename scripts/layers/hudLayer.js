HUDLayer = pc.EntityLayer.extend( 'HUDLayer',
	{ },
	{
		opponentScoreText : null,
		playerScoreText : null,
		
		init : function( layerId, worldSizeX, worldSizeY )
		{
			this._super( layerId, worldSizeX, worldSizeY );
			
			this.addSystem( new pc.systems.Render( ) );
			
			this.opponentScoreText = pc.Entity.create( this );
			this.opponentScoreText.addComponent( pc.components.Text.create( {
				color : '#FFFFFF',
				fontHeight : pc.device.canvas.height * 0.10,
				text : [ '0' ]
			} ) );
			this.opponentScoreText.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width * 0.90,
				y : pc.device.canvas.height * 0.10
			} ) );
			
			this.playerScoreText = pc.Entity.create( this );
			this.playerScoreText.addComponent( pc.components.Text.create( {
				color : '#FFFFFF',
				fontHeight : pc.device.canvas.height * 0.10,
				text : [ '0' ]
			} ) );
			this.playerScoreText.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width * 0.10,
				y : pc.device.canvas.height * 0.10
			} ) );
		},
		
		process : function( )
		{
			var gameplayScene = pc.device.game.getFirstActiveScene( ).object( );
			
			this.opponentScoreText.getComponent( 'text' ).text[0] = "" + gameplayScene.opponentScore;
			this.playerScoreText.getComponent( 'text' ).text[0] = "" + gameplayScene.playerScore;
			
			this._super( );
		}
	}
);