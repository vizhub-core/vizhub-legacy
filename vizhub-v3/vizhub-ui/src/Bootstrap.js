// This file governs the way in which React Bootstrap imports are done.
//
// Option A: import { Container, Button, Modal, ... } from 'react-bootstrap';
//  - Makes sense if we want to load react-bootstrap from a CDN
//    e.g. https://unpkg.com/react-bootstrap@2.0.2/dist/react-bootstrap.min.js
//    Weighs 109kB minified, 36.5kB over the wire from UNPKG
//    Locally built unminified: 334kB
export {
  Button,
  Container,
  Dropdown,
  FormControl,
  Form,
  Image,
  InputGroup,
  Modal,
  Nav,
  Navbar,
} from 'react-bootstrap';
//
// Option B: import { Container } from 'react-bootstrap/Container';
//  - Makes sense if we are bundling the react-bootstrap dependencies
//    and we are trying to optimize bundle size by only including what's needed
//    Locally built unminified: kB

//import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
//import Dropdown from 'react-bootstrap/Dropdown';
//import FormControl from 'react-bootstrap/FormControl';
//import Form from 'react-bootstrap/Form';
//import Image from 'react-bootstrap/Image';
//import InputGroup from 'react-bootstrap/InputGroup';
//import Modal from 'react-bootstrap/Modal';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
//
//export {
//  Button,
//  Container,
//  Dropdown,
//  FormControl,
//  Form,
//  Image,
//  InputGroup,
//  Modal,
//  Nav,
//  Navbar,
//};
