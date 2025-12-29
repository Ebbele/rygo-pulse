import './style/app.css';
import { Provider } from 'urql';
import { client } from './client'
import TodoCreatedSubscriber, { CurrentTimeSubscriber } from './TodoSubscriber';
import TodoMutation from './TodoMutation';

// load some icons
import reactSVG from './asset/React-Logo.svg';
import rsbuildSVG from './asset/rsbuild-logo.svg';
import graphqlSVG from './asset/graphql-logo-white.svg';
import goAquaSVG from './asset/Go-Logo_Aqua.svg';
import gqlgenSVG from './asset/gqlgen.svg';

/** might be anything else, start simple **/
const USER_ID = Math.floor(Math.random() * Date.now()).toString(36);

const App = () => {
    return (
        <Provider value={client}>

            <div className="title-wrapper">
                <h1 className="rygo-title" data-text="Rygo-Pulse">Rygo-Pulse</h1>
            </div>

            <div className="pulse-container">
                <section className="stack-section">
                    <div className="present-container">
                        <h2 className="proud-present">
                            Proudly <span className="accent-text">made with</span>
                        </h2>
                    </div>
                    <div className="stack-grid">
                        <div className="tech-card react">
                            <div className="icon-wrapper">
                                <img className="logo-glow" src={reactSVG} />
                            </div>
                            <span>React</span>
                        </div>
                        <div className="tech-card rsbuild">
                            <div className="icon-wrapper">
                                <img src={rsbuildSVG} />
                            </div>
                            <span>Rsbuild</span>
                        </div>
                        <div className="tech-card graphql">
                            <div className="icon-wrapper">
                                <img src={graphqlSVG} />
                            </div>
                            <span>GraphQL</span>
                        </div>
                        <div className="tech-card golang">
                            <div className="icon-wrapper">
                                <img src={goAquaSVG} />
                            </div>
                            <span>GoLang</span>
                        </div>
                        <div className="tech-card gqlgen">
                            <div className="icon-wrapper">
                                <img src={gqlgenSVG} />
                            </div>
                            <span>gqlgen</span>
                        </div>
                        <div className="stack-grid">
                            <a href="https://github.com/ebbele/rygo-pulse" className="tech-card github-cta" target="_blank" rel="noopener">
                                <div className="icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                </div>
                                <span style={{ color: "white" }}>View on GitHub</span>
                            </a>
                        </div>
                    </div>
                    <div className="divider-fade"></div>
                </section>
            </div >

            <p>
                <strong>Start building amazing things with rygo-pulse .</strong>
            </p>

            <div className="divider-pulse">&nbsp;</div>

            <TodoMutation userID={USER_ID} />
            <TodoCreatedSubscriber userID={USER_ID} />
            <CurrentTimeSubscriber />
            <footer className="pulse-footer">
                <div className="footer-divider"></div>
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} Tobias Ebbers</p>
                    <span className="footer-separator">|</span>
                    <a href="https://versteckmich.de/TobiasEbbers/impressum" target="_blank" rel="noopener">Imprint</a>
                </div>
            </footer>
        </Provider >
    );
};

export default App;
