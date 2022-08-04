import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row, Col,   } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MdDashboard } from "react-icons/md";
import { Button as ButtonSMUI} from 'semantic-ui-react'

//Image
import pic1 from './../../../../images/contacts/pic1.jpg';
import pic2 from './../../../../images/contacts/pic2.jpg';
import pic3 from './../../../../images/contacts/pic3.jpg';

const SalesBlog = [
	{image: pic1, title:'Olivia Johanson', time: '2m',},
	{image: pic2, title:'Griezerman', time: '5m',},
	{image: pic3, title:'Uli Trumb', time: '8m',},
	{image: pic2, title:'Oconner', time: '9m',},
	{image: pic1, title:'Olivia Johanson', time: '2m',},
    {image: pic1, title:'Olivia Johanson', time: '2m',},
	{image: pic2, title:'Griezerman', time: '5m',},
	{image: pic3, title:'Uli Trumb', time: '8m',},
	{image: pic2, title:'Oconner', time: '9m',},
	{image: pic1, title:'Olivia Johanson', time: '2m',},
    {image: pic1, title:'Olivia Johanson', time: '2m',},
	{image: pic2, title:'Griezerman', time: '5m',},
	{image: pic3, title:'Uli Trumb', time: '8m',},
	{image: pic2, title:'Oconner', time: '9m',},
	{image: pic1, title:'Olivia Johanson', time: '2m',},
    {image: pic1, title:'Olivia Johanson', time: '2m',},
	{image: pic2, title:'Griezerman', time: '5m',},
	{image: pic3, title:'Uli Trumb', time: '8m',},
	{image: pic2, title:'Oconner', time: '9m',},
	{image: pic1, title:'Mathew mathew', time: '2m',},
];

const VisitDate = () =>{
	// This is load more function 
	const [data, setData] = useState(SalesBlog);
	const [refresh, setRefresh] = useState(false);
	const onClick = () => {
		setRefresh(true);
		setTimeout(() => {
		  setData([
			...data,
			data[Math.floor(Math.random() * Math.floor(data.length - 1))],
		  ]);
		  setRefresh(false);
		}, 1000);
	};
	return(
		<>
        <Row> 
            
        </Row>
		</>
	)
}
export default VisitDate; 