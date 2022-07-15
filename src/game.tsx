import {useEffect, useRef} from 'react';
import './App.css';
import {Engine, Render, Runner, MouseConstraint, Mouse, Composite, Constraint, Bodies, World, Composites, Events, Body, Vector} from 'matter-js';
import {css} from "@emotion/react";

const styleGame = css`
`;
export const Game = () =>
{
	const boxRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() =>
	{
		const destroy = createGame();
		return () => destroy();
	}, []);

	const createGame = () =>
	{
		const engine = Engine.create({
			// enableSleeping: true
		} as any);
		const world = engine.world;

		// create renderer
		const render = Render.create({
			element: boxRef.current as any,
			engine: engine,
			canvas: canvasRef.current as any,
			options: {
				width: 800,
				height: 600,
				showAngleIndicator: false,
				// showCollisions: true,
				// showVelocity: true,
				wireframes: false,
				background: '#88e8d8'
			}
		});

		Render.run(render);

		// create runner
		const runner = Runner.create();
		Runner.run(runner, engine);

		// add bodies
		const ground = Bodies.rectangle(395, 600, 815, 50, {isStatic: true, render: {fillStyle: '#cc4b00'}});
		const shield = Bodies.rectangle(450, 550, 20, 300, {isStatic: true, render: {fillStyle: '#cc4b00'}});
		const rockOptions = {
			density: 0.004,
			render: {
				sprite: {
					texture: 'assets/bird.png',
					xScale: 0.1,
					yScale: 0.1
				}
			}
		};
		let rock = Bodies.circle(170, 450, 20, rockOptions);
		const anchor = {x: 170, y: 450};
		const elastic = Constraint.create({
			pointA: anchor,
			bodyB: rock,
			stiffness: 0.05
		});

		const pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, (x: number, y: number) => Bodies.rectangle(x, y, 25, 40, {
			render: {
				sprite: {
					texture: 'assets/pig.png',
					xScale: 0.1,
					yScale: 0.1
				}
			}
		}));

		Composite.add(engine.world, [ground, shield, pyramid, rock, elastic]);

		Events.on(engine, 'afterUpdate', () =>
		{
			if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430))
			{
				rock = Bodies.circle(170, 450, 20, rockOptions);
				Composite.add(engine.world, rock);
				elastic.bodyB = rock;
			}
		});

		// add mouse control
		const mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				} as any
			});

		Composite.add(world, mouseConstraint);

		// keep the mouse in sync with rendering
		render.mouse = mouse;

		// fit the render viewport to the scene
		Render.lookAt(render, {
			min: {x: 0, y: 0},
			max: {x: 800, y: 600}
		});

		return () =>
		{
			Render.stop(render);
			Engine.clear(engine);
			render.canvas.remove();
			(render as any).canvas = null;
			(render as any).context = null;
			render.textures = {};
		};
	}

	return <div ref={boxRef} css={styleGame}>
		<canvas ref={canvasRef}/>
	</div>;
};
