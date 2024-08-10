import React from 'react'
import { useParams } from 'react-router-dom'
import db from '../../../db.json'

const Contract = () => {
    const { name } = useParams();
    const filter = db.entries.filter((item) => {
      return item.name === name;
    });
    const agent = db.entries.find(
      (agent) => agent.name === name
    );

  return (
    <div>
      {agent.name}
    </div>
  )
}

export default Contract
