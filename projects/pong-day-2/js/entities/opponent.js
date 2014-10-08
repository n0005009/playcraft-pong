Opponent = pc.Base.extend( 'Opponent',
	{ },
	{
		entity : null,
		spatial : null,
		sprite : null,
		
		init : function( layer )
		{
			this._super( layer );

			this.entity = pc.Entity.create( layer );
			
			this.sprite = this.entity.addComponent( pc.components.Rect.create( {
			   color : '#FFFFFF'
			} ) );
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width * 0.9 - 15,
				y : pc.device.canvas.height / 2 - 50,
				w : 15,
				h : 100
			} ) );
		},
		
		moveDown : function( )
		{
			this.spatial.pos.y += 1;
		},
		
		moveUp : function( )
		{
			this.spatial.pos.y -= 1;
		}
	}
);