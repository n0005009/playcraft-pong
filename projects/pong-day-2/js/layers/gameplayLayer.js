GameplayLayer = pc.EntityLayer.extend( 'GameplayLayer',
	{ },
	{
		ball : null,
		player : null,
		opponent : null,
		
		init : function( layerId, worldSizeX, worldSizeY )
		{
			this._super( layerId, worldSizeX, worldSizeY );
			
			this.addSystem( new pc.systems.Render( ) );
			
			this.ball = new Ball( this );
			this.player = new Player( this );
			this.opponent = new Opponent( this );
		}
	}
);