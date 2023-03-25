import React, { useState } from 'react';
import styled from 'styled-components';

const rows = [
  createData('M3', 5.5, 2.4, 0.5, 0.35),
  createData('M4', 7, 3.2, 0.7, 0.5),
  createData('M5', 8, 4, 0.8, 0.6),
  createData('M6', 10, 5, 1, 0.75),
  createData('M8', 13, 6.5, 1.25, 1),
  createData('M10', 17, 8, 1.5, 1.25),
  createData('M12', 19, 10, 1.75, 1.5),
  createData('M16', 24, 13, 2, 1.5),
  createData('M20', 30, 16, 2.5, 1.5),
  createData('M24', 44, 20, 3, 3),
  createData('M30', 56, 24, 3.5, 3.5),
  createData('M36', 65, 28, 4, 4),
  createData('M42', 75, 32, 4.5, 4.5),
];

function createData(size, outerDiameter, thickness, pitch, height) {
  return { size, outerDiameter, thickness, pitch, height };
}

function TableComponent() {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter(selectedRow => selectedRow.size !== row.size));
    }
  };
  const handleCopyClick = () => {
    const columnNames = ['Size', 'Outer Diameter', 'Thickness', 'Pitch', 'Height'];
    const selectedRowData = selectedRows.map(row => `${row.size}\t${row.outerDiameter}\t${row.thickness}\t${row.pitch}\t${row.height}`).join('\n');
    const copiedData = `${columnNames.join('\t')}\n${selectedRowData}`;
    navigator.clipboard.writeText(copiedData);
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>Size</Th>
            <Th>Outer Diameter</Th>
            <Th>Thickness</Th>
            <Th>Pitch</Th>
            <Th>Height</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Tr key={row.size}>
              <Tdc>
                <input type="checkbox" onChange={(event) => handleCheckboxChange(event, row)} />
              </Tdc>
              <Td>{row.size}</Td>
              <Td>{row.outerDiameter}</Td>
              <Td>{row.thickness}</Td>
              <Td>{row.pitch}</Td>
              <Td>{row.height}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleCopyClick} disabled={selectedRows.length === 0}>Copy</Button>
    </div>
  );
}
export default TableComponent;

const Table = styled.table`
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Th = styled.th`
  background-color: rgb(60, 60, 60);
  padding: 10px;
  text-align: left;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Tdc = styled.td`
  padding: 10px;
  text-align: left;
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: rgb(100, 100, 100);
  }
  &:nth-child(odd) {
    background-color: rgb(80, 80, 80);
  }
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Button = styled.button`
  background-color: rgba(140, 140, 220, 0.8);
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    width: 80%;
  }
`;
