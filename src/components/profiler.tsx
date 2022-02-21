import * as React from 'react'
import {POST} from '../constants'
import {client} from 'utils'

type ProfilerProps = {phases?: ('mount' | 'update')[]} & Omit<
  React.ProfilerProps,
  'onRender'
>

let queue: unknown[] = []

setInterval(sendProfileQueue, 5000)

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend, method: POST})
}

export const Profiler = ({phases, ...props}: ProfilerProps) => {
  const reportProfile: React.ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }

  return <React.Profiler onRender={reportProfile} {...props}></React.Profiler>
}
