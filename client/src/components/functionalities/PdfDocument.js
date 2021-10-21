import React from 'react';
import { Page, View, Document, Text } from '@react-pdf/renderer';
import moment from 'moment';


const PdfDocument = ({ data }) => (
  <Document>
    <Page size="A4">
      <View>
        <Text>Boleta</Text>
        <Text>Fecha: {moment(data.date).format('DD-MM-YYYY')}</Text>
        <Text>Rut cliente: {data.customer[0]?.identification}-{data.customer[0]?.dv}</Text>
        <Text>Nombre cliente: {data.customer[0]?.firstName} {data.customer[0]?.lastName}</Text>
        <Text>Numero de cargas: {data.charge}</Text>
        <Text>Monto por carga: {data.amount}</Text>
        <Text>Monto total: {data.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
