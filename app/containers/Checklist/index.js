/**
 *
 * Checklist
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectChecklist, { makeSelectLoading, makeSelectCompletedList, makeSelectTodoList, makeSelectDeletedList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getChecklist, putChecklist } from './actions';
import Spinner from 'components/Spinner/Loadable';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { set } from 'lodash';

const notes = {
  "notes": [
    {
      "title": "Yoshi's birthday bash",
      "details": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "category": "reminders",
      "id": 1
    },
    {
      "title": "Complete my ninja training",
      "details": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
      "category": "work",
      "id": 2
    },
    {
      "title": "Order a pizza!",
      "details": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "category": "todos",
      "id": 3
    }
  ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '-webkit-fill-available',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  addContainer: {
    margin: '20px'
  },
  addButton: {
    margin: theme.spacing(1),
  },
}));

export function Checklist({todoList, completedList, deletedList, loading, getChecklist, putChecklist}) {
  useInjectReducer({ key: 'checklist', reducer });
  useInjectSaga({ key: 'checklist', saga });

  const classes = useStyles();

  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [todo, setTodo] = useState('');

  useEffect(() => {
    getChecklist();
  }, []);

  const handleDelete = (index) => {
    const tempDeletedList = deletedList;
    const tempTodoList = todoList;
    tempDeletedList.push(tempTodoList.splice(index, 1)[0]);
    putChecklist({
      list: tempTodoList,
      deletedList: tempDeletedList
    });
  };

  const completeTodo = (index) => {
    const tempCompletedList = completedList;
    const tempTodoList = todoList;
    tempCompletedList.push(tempTodoList.splice(index, 1)[0]);
    putChecklist({
      list: tempTodoList,
      completedList: tempCompletedList
    });
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    else {
      const items = Array.from(todoList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      putChecklist({list: items});
    }
    
  }

  const setEdit = (index) => {
    setEditIndex(index);
    setEditValue(todoList[index].title);
  }

  const handleEdit = (index) => {
    var tempTodo = todoList;
    tempTodo[index].title = editValue;
    putChecklist({list: tempTodo});
    setEditValue('');
    setEditIndex(-1);
  }

  const handleAdd = () => {
    const tempTodoList = [{title: todo}].concat(todoList);
    putChecklist({list: tempTodoList});
    setTodo('');
  }

  return (
    <div>
      <Helmet>
        <title>Checklist</title>
        <meta name="description" content="Description of Checklist" />
      </Helmet>
      <Container className={classes.container}>
        { loading ? <Spinner /> : '' }
        <div className={classes.addContainer}>
          <TextField id="standard-basic" label="Add Item" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            startIcon={<SaveIcon />}
            onClick={() => handleAdd()}
            disabled={!todo}
          >
            Add Item
          </Button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <List className={classes.root} {...provided.droppableProps} ref={provided.innerRef}>
                {todoList.map((note, index) => {
                  const labelId = note._id;

                  return (
                    <Draggable key={labelId} draggableId={labelId} index={index}>
                      {(provided) => (
                        <ListItem key={labelId} dense ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <ListItemIcon>
                            <Checkbox
                              color="primary"
                              onChange={() => completeTodo(index)} 
                              edge="start"
                              checked={false}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          {editIndex == index ? 
                            <TextField value={editValue} onChange={(e) => setEditValue(e.target.value)}/> : 
                            <ListItemText id={labelId} primary={note.title} />
                          }
                          <ListItemSecondaryAction>
                            {editIndex == index ? (
                              <IconButton edge="end" aria-label="comments" onClick={() => handleEdit(index)}>
                                <CheckIcon color="primary"/>
                              </IconButton>
                            ) : ''}
                            {editIndex == index ? (
                              <IconButton edge="end" aria-label="comments" onClick={() => {setEditIndex(-1); setEditValue('');}}>
                                <CloseIcon color="secondary"/>
                              </IconButton>
                            ) : (
                              <IconButton edge="end" aria-label="comments" onClick={() => {setEdit(index)}}>
                                <EditRoundedIcon color="primary"/>
                              </IconButton>
                            )}
                            <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(index)}>
                              <DeleteOutlined color="secondary"/>
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                
              </List>
            )}
          </Droppable>
        </DragDropContext>
        <List className={classes.root}>
          {completedList.map((note, index) => {
            const labelId = note._id;

            return (
              <ListItem key={labelId} dense>
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    onClick={() => {}} 
                    edge="start"
                    checked={true}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={note.title} />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </div>
  );
}

Checklist.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todoList: PropTypes.array,
  completedList: PropTypes.array,
  deletedList: PropTypes.array,
  loading: PropTypes.bool,
  getChecklist: PropTypes.func,
  putChecklist: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  checklist: makeSelectChecklist(),
  todoList: makeSelectTodoList(),
  completedList: makeSelectCompletedList(),
  deletedList: makeSelectDeletedList(),
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getChecklist: () => dispatch(getChecklist()),
    putChecklist: (body) => dispatch(putChecklist(body))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Checklist);
