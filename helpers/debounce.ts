export const debounce = (fn: Function, ms = 3000) => {
    const aux = ()=>{
      fn()
      clearInterval(interval)
    }

    const interval = setTimeout(aux, ms)
  };