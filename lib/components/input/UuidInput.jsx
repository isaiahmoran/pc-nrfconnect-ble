/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

import React, { PropTypes } from 'react';

import UuidLookup from '../UuidLookup';
import TextInput from './TextInput';

import { validateUuid } from '../../utils/validateUuid';

class UuidInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.uuid = this.props.value;
    }

    validateUuidInput() {
        return validateUuid(this.uuid);
    }

    LonUuidChange(e) {
        const hexRegEx = /^[0-9A-F]*$/i;
        const textarea = e.target;
        this.uuid = textarea.value;
        const valid = hexRegEx.test(this.uuid);
        let caretPosition = textarea.selectionStart;

        if (!valid) {
            caretPosition -= 1;
            this.forceUpdate(() => textarea.setSelectionRange(caretPosition, caretPosition));
            return;
        }

        this.props.handleSelection(this.uuid);
    }

    LhandleSelection(uuid) {
        this.uuid = uuid;
        this.props.handleSelection(uuid);
    }

    render() {
        const {
            label,
            uuidDefinitions,
            value,
        } = this.props;

        const uuidSelectButton = (
            <UuidLookup
                onSelect={(event, eventKey) => this.LhandleSelection(eventKey)}
                title={`Predefined ${label}s`}
                uuidDefs={uuidDefinitions()}
                pullRight
            />
        );

        return (
            <TextInput
                label={label}
                hasFeedback
                validationState={this.validateUuidInput()}
                value={value}
                onChange={e => this.LonUuidChange(e)}
                buttonAfter={uuidSelectButton}
            />
        );
    }
}

UuidInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    uuidDefinitions: PropTypes.func.isRequired,
    handleSelection: PropTypes.func.isRequired,
};

export default UuidInput;
