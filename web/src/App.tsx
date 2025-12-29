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
const USER_ID = '1234';

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
                    </div>
                    <div className="divider-fade"></div>
                </section>
            </div>

            <p>
                <strong>Start building amazing things with rygo-pulse .</strong>
            </p>

            <div className="divider-pulse">&nbsp;</div>

            <TodoMutation userID={USER_ID} />
            <TodoCreatedSubscriber userID={USER_ID} />
            <CurrentTimeSubscriber />
        </Provider>
    );
};

export default App;
