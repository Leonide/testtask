import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Input, Typography, Spin, Empty } from 'antd'

const { Title } = Typography

const Jobs = ({ items, isFetching, processId, jobsController }) => {
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    jobsController.getAllJobs(processId)
    const timer = setInterval(() => jobsController.getJobsInsensibly(processId), 10000)

    return () => {
      clearInterval(timer)
    }
  }, [processId])

  const onInputChange = useCallback(e => {
    setFilterValue(e.target.value)
  }, [filterValue])

  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <Title level={3}>Jobs:</Title>
        <FilterSection>
          Filter by name&nbsp;
          <Input
            type='text'
            value={filterValue}
            onChange={onInputChange}
            style={{ width: '96px' }}
          />
        </FilterSection>
        {items.length
        ? items.filter(item => item.name.toLowerCase().includes(filterValue))
          .map(item => (
            <Job key={item.id}>
              <strong>{ item.name }</strong>
              <Job.P>{ item.status }</Job.P>
            </Job>
        ))
        : <Empty description='Click on process name' />
        }
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div`
  background-color: #ffffff;
  flex: 1;
  padding: 16px;
  height: 100%;
`
const Job = styled.div`
  border: 1px solid #f0f0f0;
  padding: 4px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
`

const FilterSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

Job.P = styled.p`
  margin-bottom: 0
`

export default Jobs
