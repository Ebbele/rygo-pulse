import { useState } from 'react';
import { useSubscription } from 'urql'

const TODO_CREATED_SUB = `
subscription ($userId: String!){
  todoCreated(userId: $userId){
      id
      text
  }
}
`;

const CURRENT_TIME_SUB = `
subscription {
  currentTime
}
`;

export function CurrentTimeSubscriber() {
    const [pause, setPause] = useState(false)

    const [result] = useSubscription({
        query: CURRENT_TIME_SUB,
        pause: pause
    }, (_, result) => result)

    return <section>
        <h2>Subscribe on current Time:</h2>

        <button className="btn-tech" onClick={() => setPause(!pause)}>
            {pause ? 'RESUME' : 'PAUSE'} SUBSCRIPTION
        </button>

        {!pause && <p>&nbsp;</p>}

        {pause && <div className="divider-wave"></div>}

        <p className="center subscribed w-50">
            {pause ? <strong>subscription paused</strong> :
                result.data?.currentTime
                    ? result.data.currentTime
                    : 'Waiting for time...'}

        </p>
    </section>

}

export default function TodoCreatedSubscriber(
    { userID }: { userID: string }
) {
    const [result] = useSubscription({
        query: TODO_CREATED_SUB,
        variables: {
            userId: userID
        }
    }, (_, result) => result)

    return <section>
        <h2>Subscribe on created ToDo:</h2>
        {result.data?.todoCreated
            ?
            <p className="center subscribed w-50">
                {result.data.todoCreated.id} : {result.data.todoCreated.text}
            </p>
            :
            <p className="center pulse w-50">
                Waiting for updates...
            </p>
        }
    </section>

}
