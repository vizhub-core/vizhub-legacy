// This file governs the way in which React Bootstrap imports are done.
//
// Option A: import { Container, Button, Modal, ... } from 'react-bootstrap';
//  - Makes sense if we want to load react-bootstrap from a CDN
//    e.g. https://unpkg.com/react-bootstrap@2.0.2/dist/react-bootstrap.min.js
//    Weighs 109kB
//
// Option B: import { Container } from 'react-bootstrap/Container';
//  - Makes sense if we are bundling the react-bootstrap dependencies
//    and we are trying to optimize bundle size by only including what's needed

export {
  Container,
  Button,
  Modal,
  Nav,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
