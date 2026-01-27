import { CountryCode } from 'libphonenumber-js';
import { NumberType } from 'libphonenumber-js';

type MuiTelInputReason = 'country' | 'input';

export interface MuiTelInputInfo {
    countryCode: CountryCode | null;
    countryCallingCode: string | null;
    nationalNumber: string | null;
    numberType: Exclude<NumberType, undefined> | null;
    numberValue: string | null;
    reason: MuiTelInputReason;
}
