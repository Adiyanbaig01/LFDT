/**
 * Centralized Animation Frame Manager
 * Consolidates multiple requestAnimationFrame loops into a single managed loop
 * with frame skipping for lower-end devices
 */

type AnimationCallback = (deltaTime: number, timestamp: number) => void;
type Priority = 'high' | 'medium' | 'low';

interface AnimationTask {
    id: string;
    callback: AnimationCallback;
    priority: Priority;
    frameSkip: number;
    frameCount: number;
}

class AnimationManager {
    private static instance: AnimationManager | null = null;
    private tasks: Map<string, AnimationTask> = new Map();
    private rafId: number | null = null;
    private lastTime: number = 0;
    private isRunning: boolean = false;
    private targetFPS: number = 60;
    private frameTime: number = 1000 / 60;
    private accumulator: number = 0;

    private constructor() {
        // Detect device performance
        this.detectPerformance();
    }

    public static getInstance(): AnimationManager {
        if (!AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
        return AnimationManager.instance;
    }

    private detectPerformance(): void {
        // Simple performance detection based on device memory and cores
        const memory = (navigator as any).deviceMemory;
        const cores = navigator.hardwareConcurrency;
        
        if (memory && memory <= 4 || cores && cores <= 2) {
            // Low-end device: target 30fps
            this.targetFPS = 30;
            this.frameTime = 1000 / 30;
        } else if (memory && memory >= 8 && cores && cores >= 4) {
            // High-end device: can handle 60fps
            this.targetFPS = 60;
            this.frameTime = 1000 / 60;
        } else {
            // Mid-range device: 45fps
            this.targetFPS = 45;
            this.frameTime = 1000 / 45;
        }
    }

    public register(
        id: string,
        callback: AnimationCallback,
        priority: Priority = 'medium',
        frameSkip: number = 0
    ): void {
        this.tasks.set(id, {
            id,
            callback,
            priority,
            frameSkip,
            frameCount: 0
        });

        // Start the animation loop if not running
        if (!this.isRunning && this.tasks.size > 0) {
            this.start();
        }
    }

    public unregister(id: string): void {
        this.tasks.delete(id);
        
        // Stop the animation loop if no tasks remain
        if (this.tasks.size === 0) {
            this.stop();
        }
    }

    private start(): void {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        this.animate(this.lastTime);
    }

    private stop(): void {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    private animate = (currentTime: number): void => {
        if (!this.isRunning) return;

        const deltaTime = Math.min(currentTime - this.lastTime, 100); // Cap at 100ms
        this.lastTime = currentTime;
        
        // Fixed timestep with interpolation for smooth animation
        this.accumulator += deltaTime;
        
        // Process high priority tasks every frame
        const highPriorityTasks: AnimationTask[] = [];
        const mediumPriorityTasks: AnimationTask[] = [];
        const lowPriorityTasks: AnimationTask[] = [];
        
        this.tasks.forEach(task => {
            if (task.priority === 'high') {
                highPriorityTasks.push(task);
            } else if (task.priority === 'medium') {
                mediumPriorityTasks.push(task);
            } else {
                lowPriorityTasks.push(task);
            }
        });
        
        // Execute tasks based on priority and frame skipping
        while (this.accumulator >= this.frameTime) {
            // High priority: always execute
            highPriorityTasks.forEach(task => {
                task.callback(this.frameTime, currentTime);
            });
            
            // Medium priority: execute based on frame skip
            mediumPriorityTasks.forEach(task => {
                if (task.frameCount % (task.frameSkip + 1) === 0) {
                    task.callback(this.frameTime, currentTime);
                }
                task.frameCount++;
            });
            
            // Low priority: execute less frequently
            lowPriorityTasks.forEach(task => {
                const skipFrames = Math.max(task.frameSkip, 2);
                if (task.frameCount % (skipFrames + 1) === 0) {
                    task.callback(this.frameTime, currentTime);
                }
                task.frameCount++;
            });
            
            this.accumulator -= this.frameTime;
        }
        
        // Interpolation for remaining time
        const alpha = this.accumulator / this.frameTime;
        
        this.rafId = requestAnimationFrame(this.animate);
    };

    // Utility method to adjust performance based on runtime metrics
    public adjustPerformance(fps: number): void {
        if (fps < 25 && this.targetFPS > 30) {
            // Reduce target FPS if struggling
            this.targetFPS = 30;
            this.frameTime = 1000 / 30;
        } else if (fps > 55 && this.targetFPS < 60) {
            // Increase target FPS if performing well
            this.targetFPS = 60;
            this.frameTime = 1000 / 60;
        }
    }

    // Get current performance metrics
    public getMetrics(): { targetFPS: number; taskCount: number } {
        return {
            targetFPS: this.targetFPS,
            taskCount: this.tasks.size
        };
    }
}

export default AnimationManager;
export type { AnimationCallback, Priority };
