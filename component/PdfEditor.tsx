import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButtonText: {
    color: 'white',
  },
});

const PdfEditor = () => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  const pickPdf = async () => {
    try {
      const response: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const fileUri = response[0].uri;
      setPdfUri(fileUri);
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  const closePdf = () => {
    setPdfUri(null);
  };

  return (
    <View style={styles.container}>
      {pdfUri ? (
        <>
          <Pdf
            source={{ uri: pdfUri }}
            onLoadComplete={(numberOfPages) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log('Error while displaying PDF:', error);
            }}
            style={styles.pdf}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closePdf}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Button title="Pick PDF" onPress={pickPdf} />
      )}
    </View>
  );
};

export default PdfEditor;
