import { create } from './api';
import console from 'console';

create().then(client => {
    client.getVersion()
        .then(e => {
            console.log(e);
            return client.login({
                username: 'test@ust.hk',
                pass: 'test'
            });
        })
        .then(e => {
            console.log(e);
            return client.getThreadContent({ message: 6917815, page: 1 });
        })
        .then(e => console.log(e))
        .catch(e => console.log('error' + e));
});



