import React from 'react';
import {Modal, Text, View} from 'react-native';
import {StandardButton} from './Buttons';
import {
  DialogueBoxProps,
  DialogueBoxWithButtonProps,
} from '../functional/interfaces';
import {styles} from '../styles/styles';

export const DialogueBoxWithButtons = (props: DialogueBoxWithButtonProps) => {
  return (
    <Modal transparent={true}>
      <View style={styles.dialogueSection}>
        <View style={styles.dialogueBox}>
          <View style={styles.dialogueContainer}>
            <Text style={styles.dialogueMessage}>{props.text}</Text>
            <StandardButton
              pressHandler={() => props.confirmAction()}
              text={props.confirmText}
              buttonStyle={styles.confirmButton}
              textStyle={styles.decisionButtonText}
              opacity={0.8}
            />
            <StandardButton
              pressHandler={() => props.cancelAction()}
              text={props.cancelText}
              buttonStyle={styles.cancelButton}
              textStyle={styles.decisionButtonText}
              opacity={0.8}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const DialogueBox = (props: DialogueBoxProps) => {
  return (
    <Modal transparent={true}>
      <View style={styles.dialogueSection}>
        <View style={styles.dialogueBox}>
          <View style={styles.dialogueContainer}>
            <Text style={styles.dialogueMessage}>{props.text}</Text>
            <StandardButton
              pressHandler={() => props.cancelAction()}
              text="Close"
              buttonStyle={styles.cancelButton}
              textStyle={styles.decisionButtonText}
              opacity={0.8}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
