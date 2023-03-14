const STOPPED = Symbol.for("@@gameloop/stopped");
const PAUSED = Symbol.for("@@gameloop/paused");
const RUNNING = Symbol.for("@@gameloop/running");

// A GameLoop class is defined to manage the timing of a game loop
class GameLoop {
    // A constructor is defined which accepts options as an argument
    constructor(options = {}) {
        // The initial state of the game loop is set to stopped
        this.state = STOPPED;
        // Default options are defined for the game loop including a step, maximum updates and any provided options
        this.options = {
            step: 1000 / 60,
            maxUpdates: 300,
            ...options
        };
        // The tick function is bound to the class instance
        this.tick = this.tick.bind(this);
    }
    // The following functions are defined to check the state of the game loop
    get isStopped() {
        return this.state === STOPPED;
    }
    get isPaused() {
        return this.state === PAUSED;
    }
    get isRunning() {
        return this.state === RUNNING;
    }
    // The start function is defined to start the game loop
    start() {
        if (this.isStopped) {
            this.state = RUNNING;
            // Variables are defined for the timing of the game loop

            const lag = 0;
            const delta = 0;
            const total = 0;
            const last = null;
            // The timing object is defined using the variables defined above

            this.timing = {
                last,
                total,
                delta,
                lag
            };
            // The frame is requested for the game loop

            this.frame = requestAnimationFrame(this.tick);
        }
    }
    // The stop function is defined to stop the game loop
    stop() {
        if (this.isRunning || this.isPaused) {
            this.state = STOPPED;
            cancelAnimationFrame(this.frame);
        }
    }
    // The pause function is defined to pause the game loop
    pause() {
        if (this.isRunning) {
            this.state = PAUSED;
            cancelAnimationFrame(this.frame);
        }
    }
    // If the game loop is currently paused, the game loop state is changed to running and the tick function is called
    resume() {
        if (this.isPaused) {
            this.state = RUNNING;
            this.frame = requestAnimationFrame(this.tick);
        }
    }
    // This function is called every time a new frame is requested using requestAnimationFrame
    // It calculates the time between frames and updates the game loop based on the elapsed time
    tick(time) {
        // If this is the first frame, set the last frame time to the current time
        if (this.timing.last === null) this.timing.last = time;
        // Calculate the elapsed time since the last frame

        this.timing.delta = time - this.timing.last;
        // Update the total elapsed time

        this.timing.total += this.timing.delta;
        // Add the elapsed time to the lag time

        this.timing.lag += this.timing.delta;
        // Set the last frame time to the current time

        this.timing.last = time;
        // Update the game loop as many times as necessary based on the elapsed time

        let numberOfUpdates = 0;

        while (this.timing.lag >= this.options.step) {
            this.timing.lag -= this.options.step;
            this.onUpdate(this.options.step, this.timing.total);
            this.numberOfUpdates++;
            // If the maximum number of updates has been reached, call the onPanic function and exit the loop

            if (this.numberOfUpdates >= this.options.maxUpdates) {
                this.onPanic();
                break;
            }
        }
        // Render the current frame based on the remaining lag time

        this.onRender(this.timing.lag / this.options.step);
        // Request the next frame

        this.frame = requestAnimationFrame(this.tick);
    }
}