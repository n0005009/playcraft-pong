Pong = pc.Game.extend( 'Pong',
	{ },
	{
		gameScene : null,
		
		onReady : function( )
		{
			this._super( );
			
			if( pc.device.devMode )
				pc.device.loader.setDisableCache( );
			
			this.gameScene = new GameScene( );
			this.addScene( this.gameScene );
		}
	}
);