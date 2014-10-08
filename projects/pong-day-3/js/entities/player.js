Player = pc.Base.extend( 'Player',
	{ },
	{
		entity : null,
		physics : null,
		spatial : null,
		sprite : null,
		
		init : function( layer )
		{
			this._super( layer );

			this.entity = pc.Entity.create( layer );
			this.entity.addTag( 'PADDLE' );
			
			this.sprite = this.entity.addComponent( pc.components.Rect.create( {
			   color : '#FFFFFF'
			} ) );
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width * 0.1,
				y : pc.device.canvas.height / 2 - 50,
				w : 15,
				h : 100
			} ) );
			
			this.physics = this.entity.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.PADDLE,
				collisionMask : CollisionType.BALL | CollisionType.WALL,
				fixedRotation : true,
				linearDamping : 0.5,
				mass : 100
			} ) );
		},
		
		moveDown : function( )
		{
			this.physics.applyForce( 150, 90 );
		},
		
		moveUp : function( )
		{
			this.physics.applyForce( 150, -90 );
		}
	}
);