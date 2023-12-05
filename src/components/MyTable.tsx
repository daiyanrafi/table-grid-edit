import React, { useState, useEffect } from 'react';
import { DetailsList, IColumn, Selection } from '@fluentui/react/lib/DetailsList';
import { fetchExampleData } from '../data/exampleData';
import './MyTable.css';
import { ExampleDataItem } from '../model';

const MyTable: React.FC = () => {
  const [items, setItems] = useState<ExampleDataItem[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);
  // const [selection] = useState<Selection | undefined>(() => new Selection({}));
  const [editableItemId, setEditableItemId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExampleData();
      console.log(data.length);
      setItems(data);

      const newColumns: IColumn[] = [
        { key: 'id', name: 'User ID', fieldName: 'id', minWidth: 80, maxWidth: 120, isResizable: true, isSorted: false, isSortedDescending: false },
        { key: 'title', name: 'Case Title', fieldName: 'title', minWidth: 150, maxWidth: 250, isResizable: true, isSorted: false, isSortedDescending: false, onRender: renderEditableColumn },
        { key: 'userId', name: 'Case Number', fieldName: 'userId', minWidth: 80, maxWidth: 120, isResizable: true, isSorted: false, isSortedDescending: false, onRender: renderCenteredColumn },
        { key: 'completed', name: 'Status', fieldName: 'completed', minWidth: 120, maxWidth: 120, isResizable: true, isSorted: false, isSortedDescending: false, onRender: renderStatusColumn },
      ];

      setColumns(newColumns);
    };

    fetchData();
  }, [editableItemId]);

  //double click
  const handleDoubleClick = (item: ExampleDataItem) => {
    console.log('handleInputChange called, double click');
    setEditableItemId((prevId) => (prevId === item.id ? null : item.id));
  };

  //edit render function
  const renderEditableColumn = (item: ExampleDataItem) => {
    if (editableItemId === item.id) {
      return (
        <input
          type='text'
          value={item.editedTitle != undefined ? item.editedTitle : item.title}
          // value={item.editedTitle ?? item.title}
          onChange={(e) => handlerInputChange(e, item.id)}
          // onBlur={()=>{}}
          onKeyDown={(e) => handleInputKeyDown(e, item.id)}
        />
      );
    } else {
      return (
        <span onDoubleClick={() => handleDoubleClick(item)}>
          {item.title}
        </span>
      );
    }
  };

  //handle input key and press
  // const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, itemId: number) => {
  //   if(e.key === 'Enter'){
  //     const updatedItems = items.map((item) => 
  //     item.id === itemId && item.editedTitle !== undefined ? {
  //       ...item, title: item.editedTitle } : item
  //     );
  //     setItems(updatedItems);
  //     setEditableItemId(null);
  //   }
  // };

  //handle input key down
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, itemId: number) => {
    console.log('handleInputKeyDown called, new gg');
    if (e.key === 'Enter') {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === itemId && item.editedTitle != undefined
            ? { ...item, title: item.editedTitle, editedTitle: undefined }
            : item
        );
        console.log('Updated Items: gg-3', updatedItems);
        return updatedItems;
      });
      setEditableItemId(null);
    }
  };
  //handlee input change
  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    console.log('handleInputChange called, value changing');
    const updateItems = items.map((item) =>
      item.id === itemId ? { ...item, editedTitle: e.target.value } : item
    );
    setItems(updateItems);
  }

  //Set column color
  const renderStatusColumn = (item: ExampleDataItem) => (
    <span style={{ color: item.completed ? 'green' : 'red' }}>
      {item.completed ? 'Completed' : 'Incomplete'}
    </span>
  );

  //cloumn center
  const renderCenteredColumn = (item: ExampleDataItem) => (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {item.userId}
    </span>
  );

  return (
    <div className="my-table-container">
      <DetailsList
        key={items.length}
        items={items}
        columns={columns}
        setKey="set"
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </div>
  );
};

export default MyTable;