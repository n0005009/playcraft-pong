Player = pc.Base.extend( 'Player',
	{ },
	{
		entity : null,
		physics : null,
		spatial : null,
		sprite : null,
		
		pointsScored : 0,
		
		init : function( layer )
		{
			this._super( layer );
			
			this.entity = pc.Entity.create( layer );
			this.entity.addTag( 'PADDLE' );
			
			//this.sprite = this.entity.addComponent( pc.components.Rect.create( {
			//	color : '#FFFFFF'
			//} ) );
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				x : pc.device.canvas.width * 0.05,
				y : pc.device.canvas.height * 0.50,
				w : pc.device.canvas.width * 0.02,
				h : pc.device.canvas.height * 0.15
			} ) );
			
			this.physics = this.entity.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.PADDLE,
				collisionMask : CollisionType.BALL | CollisionType.WALL,
				fixedRotation : true,
				linearDamping : 0.5,
				mass : 10,
				shapes : [
					{ shape : pc.CollisionShape.RECT },
					{ shape : pc.CollisionShape.CIRCLE, offset : { y : -this.spatial.dim.y / 2 } },
					{ shape : pc.CollisionShape.CIRCLE, offset : { y : this.spatial.dim.y / 2 } }
				]
			} ) );
		},
		
		draw : function( )
		{
			//pc.device.ctx.fillStyle = "#FFFFFF";
			//pc.device.ctx.moveTo( this.spatial.pos.x + this.spatial.dim.x / 2, this.spatial.pos.y + this.spatial.dim.y );
			//pc.device.ctx.arc( this.spatial.pos.x + this.spatial.dim.x / 2, this.spatial.pos.y, this.spatial.dim.x / 2, 0 , 2 * Math.PI, false );
			//pc.device.ctx.moveTo( this.spatial.pos.x + this.spatial.dim.x / 2, this.spatial.pos.y + this.spatial.dim.y );
			//pc.device.ctx.arc( this.spatial.pos.x + this.spatial.dim.x / 2, this.spatial.pos.y + this.spatial.dim.y, this.spatial.dim.x / 2, 0 , 2 * Math.PI, false );
			//pc.device.ctx.fill( );
		},
		
		moveDown : function( )
		{
			this.physics.applyForce( 15, 90 );
		},
		
		moveUp : function( )
		{
			this.physics.applyForce( 15, -90 );
		}
	}
);