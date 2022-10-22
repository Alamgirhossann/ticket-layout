import { Document, Image, Page, StyleSheet, Text } from '@react-pdf/renderer';
import React from 'react';


const styles = StyleSheet.create({})

const Table = ({image}) => {
    return (
        <Document>
        <Page>
        <Text>table</Text>
        <Image src={image}/>
        </Page>
        </Document>
    );
};

export default Table;