export const isProvided = (...args) => args.every((e) => !e ? e === 0 ? true : false : true)