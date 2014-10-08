Ball = pc.Base.extend( 'Ball',
	{ },
	{
		entity : null,
		spatial : null,
		sprite : null,
		
		init : function( layer )
		{
			this._super( layer );

			this.entity = pc.Entity.create( layer );
			
			this.sprite = this.entity.addComponent(
				pc.components.Circle.create( { color : '#FFFFFF' } )
			);
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width / 2 - 8,
				y : pc.device.canvas.height / 2 - 8,
				w : 15,
				h : 15
			} ) );
		}
	}
);