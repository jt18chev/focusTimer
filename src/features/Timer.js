import React, { useState } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { colors } from "../utils/colors.js";
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes.js';
import { ProgressBar } from 'react-native-paper';
import { Timing } from '../features/Timing';

export const Timer = ({ focusSubject, clearSubject }) => {
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
    ];

    const [progress, setProgress] = useState(1);
    const [isStarted, setIsStarted] = useState(false);
    const [minutes, setMinutes] = useState(0.2);
    return (
        <View style={styles.container}>
            <View>
                <Countdown
                    minutes={minutes}
                    isPaused={isStarted}
                    onProgress={setProgress}
                    onEnd={() => Vibration.vibrate(PATTERN)} />
            </View>
            <View style={{ paddingTop: spacing.lg }}>
                <ProgressBar
                    style={styles.progressBar}
                    progress={progress}
                    color={colors.sienaGold}
                />
                <View style={styles.buttonWrapper}>
                    <Timing onChangeTime={setMinutes} />
                </View>
                <View styles={styles.startStopWrapper}>
                    {isStarted && (<RoundedButton title="start" onPress={() => setIsStarted(false)} />
                    )}
                    {!isStarted && (<RoundedButton title="pause" onPress={() => setIsStarted(true)} />
                    )}
                </View>
            </View>
            <Text style={styles.text}>Focus Feature: </Text>
            <Text style={styles.text}>{focusSubject}</Text>
            <View style={styles.buttonWrapper}>
                <RoundedButton size={50} title="-" onPress={clearSubject} />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: spacing.md,
    },
    startStopWrapper: {
        justifyContent: "center",
        padding: spacing.md,
    },
    text: {
        paddingTop: spacing.md,
        color: colors.offWhite,
        fontSize: fontSizes.lg,
        textAlign: "center",
    },
    progressBar: {
        height: 10,
        borderRadius: 60,
    },
});