import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Typography, Spin, Select } from 'antd'

const { Title } = Typography
const { Option } = Select

const Processes = ({ items, isFetching, processesController }) => {
  const [newProc, setNewProc] = useState('')
  const [sortingValue, setSortingValue] = useState('name')

  useEffect(() => {
    processesController.getAllProcesses()
    const timer = setInterval(() => processesController.getProcessesInsensibly(), 90000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const onInputChange = useCallback(e => {
    setNewProc(e.target.value)
  }, [newProc])

  const onSortingChange = useCallback(value => {
    setSortingValue(value)
  }, [sortingValue])

  const onSubmit = async () => {
    await processesController.createNewProcess(newProc)
    await processesController.getAllProcesses()
  }

  const onRemove = (id, jobIds) => async () => {
    await processesController.removeParticularProcess(id, jobIds)
    await processesController.getAllProcesses()
  }

  const selectProcess = id => () => {
    processesController.selectTheProcess(id)
  }

  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <Title level={3}>Processes:</Title>
        <SortingSection>
          Sort by&nbsp;
          <Select defaultValue='name' style={{ width: 120 }} onChange={onSortingChange}>
            <Option value='name'>Name</Option>
            <Option value='startTime'>Start Time</Option>
            <Option value='jobsCount'>Jobs Count</Option>
            <Option value='status'>Status</Option>
          </Select>
        </SortingSection>
        <List>
          {items
            .sort((a, b) => a[sortingValue].toString().localeCompare(b[sortingValue].toString()))
            .map(item => (
              <Process
                key={item.id}
                item={item}
                onRemove={onRemove}
                selectProcess={selectProcess}
              />
          ))}
        </List>
        <Form
          name='create_new_item'
          layout='inline'
          onFinish={onSubmit}
        >
          <Form.Item>
            <Input
              type='text'
              value={newProc}
              onChange={onInputChange}
              placeholder='New process name'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </Spin>
  )
}

const Process = props => {
  return (
    <List.Item>
      <span onClick={props.selectProcess(props.item.id)}>{ props.item.name }</span>
      <span>{ props.item.startTime }</span>
      <span>{ props.item.jobsCount }</span>
      <span>{ props.item.status }</span>
      <Button type='link' onClick={props.onRemove(props.item.id, props.item.jobIds)}>delete</Button>
    </List.Item>
  )
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
`

List.Item = styled.li`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
`

const Wrapper = styled.div`
  background-color: #ffffff;
  flex: 1;
  padding: 16px;
  height: 100%;
`

const SortingSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

export default Processes
