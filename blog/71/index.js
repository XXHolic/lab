/** A simple queue that holds promises. */
class PromiseBuffer {
    constructor(_limit) {
        this._limit = _limit;
        /** Internal set of queued Promises */
        this._buffer = [];
    }
    /**
     * Says if the buffer is ready to take more requests
     */
    isReady() {
      const length = this.length();
      console.info('length',length)
        return this._limit === undefined || length < this._limit;
    }
    /**
     * Add a promise to the queue.
     *
     * @param task Can be any PromiseLike<T>
     * @returns The original promise.
     */
    add(task) {
        if (!this.isReady()) {
            return Promise.reject(new Error('Not adding Promise due to buffer limit reached.'));
        }
        if (this._buffer.indexOf(task) === -1) {
            this._buffer.push(task);
        }
        task
            .then(() => this.remove(task))
            .then(null, () => this.remove(task).then(null, () => {
            // We have to add this catch here otherwise we have an unhandledPromiseRejection
            // because it's a new Promise chain.
        }));
        return task;
    }
    /**
     * Remove a promise to the queue.
     *
     * @param task Can be any PromiseLike<T>
     * @returns Removed promise.
     */
    remove(task) {
        const removedTask = this._buffer.splice(this._buffer.indexOf(task), 1)[0];
        const length = this.length();
        console.info('length',length)
        return removedTask;
    }
    /**
     * This function returns the number of unresolved promises in the queue.
     */
    length() {
        return this._buffer.length;
    }
    /**
     * This will drain the whole queue, returns true if queue is empty or drained.
     * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
     *
     * @param timeout Number in ms to wait until it resolves with false.
     */
    drain(timeout) {
        return new Promise(resolve => {
            const capturedSetTimeout = setTimeout(() => {
                if (timeout && timeout > 0) {
                    resolve(false);
                }
            }, timeout);
            Promise.all(this._buffer)
                .then(() => {
                clearTimeout(capturedSetTimeout);
                resolve(true);
            })
                .then(null, () => {
                resolve(true);
            });
        });
    }
}

const promiseManage = new PromiseBuffer(3)
console.info('promiseManage',promiseManage)

function returnPromiseFun(time) {
  return new Promise((resolve) => {

    setTimeout(() => {
      const text = `${time} seconds`;
      console.info(text)
      resolve(text)
    },time * 1000)
  })
}

promiseManage.add(returnPromiseFun(3))

promiseManage.add(returnPromiseFun(2))

promiseManage.add(new Promise((resolve ,reject) => {

  setTimeout(() => {
    console.info('1 seconds')
    resolve('1 seconds')
  },1000)

}))