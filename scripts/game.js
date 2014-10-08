Pong = pc.Game.extend( 'Pong',
	{ },
	{
		gameplayScene : null,
		titleScene : null,
		
		onReady : function( )
		{
			this._super( );
			
			// TODO: Re-enable caching for production
			if( pc.device.devMode )
			{
				pc.device.loader.setDisableCache( );
			}
			
			this.titleScene = new TitleScene( );
			this.addScene( this.titleScene );
		},
		
		onResize : function( )
		{
			this._super( );
			
			pc.device.canvas.style.marginLeft = Math.floor( -pc.device.canvas.width / 2 ) + "px";
			pc.device.canvas.style.marginTop = Math.floor( -pc.device.canvas.height / 2 ) + "px";
		}
	}
);