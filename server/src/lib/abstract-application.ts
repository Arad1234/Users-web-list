abstract class Application {
	abstract setup(): Promise<void> | void;
}

export default Application;
