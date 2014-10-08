Ball = pc.Base.extend( 'Ball',
	{ },
	{
		entity : null,
		spatial : null,
		sprite : null,
		physics : null,
		
		init : function( layer )
		{
			this._super( layer );

			this.entity = pc.Entity.create( layer );
			this.entity.addTag( 'BALL' );
			
			this.sprite = this.entity.addComponent(
				pc.components.Circle.create( { color : '#FFFFFF' } )
			);
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				dir : Math.floor( Math.random( ) * 4 ) * 90 + ( Math.random( ) * 70 + 10 ),
				x : pc.device.canvas.width / 2 - 8,
				y : pc.device.canvas.height / 2 - 8,
				w : 15,
				h : 15
			} ) );
			
			this.physics = this.entity.addComponent( pc.components.Physics.create( {
				bounce : 1,
				collisionCategory : CollisionType.BALL,
				collisionMask : CollisionType.GOAL | CollisionType.PADDLE | CollisionType.WALL,
				mass : 1
			} ) );
			this.physics.applyImpulse( 2, 0 );
		}
	}
);