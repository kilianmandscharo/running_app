import React from 'react';
import {Modal, Text, View} from 'react-native';
import {StandardButton} from './Buttons';
import {
  DialogueBoxProps,
  DialogBoxConfirmCancelProps,
  DialogBoxThreeButtonsProps,
} from '../functional/interfaces';
import {styles} from '../styles/styles';

export const DialogueBox = (props: DialogueBoxProps) => {
  return (
    <Modal transparent={true}>
      <View style={styles.dialogSection}>
        <View style={styles.dialogBox}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogMessage}>{props.text}</Text>
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

export const DialogBoxConfirmCancel = (props: DialogBoxConfirmCancelProps) => {
  return (
    <Modal transparent={true}>
      <View style={styles.dialogSection}>
        <View style={styles.dialogBox}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogMessage}>{props.text}</Text>
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

export const DialogBoxThreeButtons = (props: DialogBoxThreeButtonsProps) => {
  return (
    <Modal transparent={true}>
      <View style={styles.dialogSection}>
        <View style={styles.dialogBox}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogMessage}>{props.text}</Text>
            <StandardButton
              pressHandler={() => props.firstChoiceAction()}
              text={props.firstChoiceText}
              buttonStyle={styles.firstChoiceButton}
              textStyle={styles.decisionButtonText}
              opacity={0.8}
            />
            <StandardButton
              pressHandler={() => props.secondChoiceAction()}
              text={props.secondChoiceText}
              buttonStyle={styles.secondChoiceButton}
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
