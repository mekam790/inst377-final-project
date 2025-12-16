import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const Clock = () => {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const id = setInterval(() => setTime(dayjs()), 1000)
    return () => clearInterval(id)
  }, [])

  return <div className="info">{time.format('HH:mm:ss')}</div>
}

export default Clock;