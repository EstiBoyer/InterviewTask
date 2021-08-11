const TIMEOUT = 30000;

function timeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise(function(resolve, reject) {
    let timeout = setTimeout(function() {
      reject(new Error("Timeout Error"));
    }, ms);
    promise
      .then(res => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch(e => {
        clearTimeout(timeout);
        reject(e);
      });

  });
}

export const networkRequest = async (method: string, url: string, body?: any): Promise<any> => {
  try {
    const res = await timeout(TIMEOUT, fetch(url, {
      method: method,
      body: body
    }));
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
