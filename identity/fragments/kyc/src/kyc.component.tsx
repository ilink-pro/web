import { useReactiveVar }           from '@apollo/client'

import React                        from 'react'
import { FC }                       from 'react'

import { Condition }                from '@ui/condition'
import { Box }                      from '@ui/layout'
import { Layout }                   from '@ui/layout'
import { Row }                      from '@ui/layout'

import { Address }                  from './address'
import { BasicInformation }         from './basic-information'
import { VerificationStatus }       from './data'
import { DataVerification }         from './data-verification'
import { KYCLayout }                from './kyc-layout'
import { Progress }                 from './progress'
import { ProofOfAddress }           from './proof-of-address'
import { ProofOfIdentityOne }       from './proof-of-identity-one'
import { ProofOfIdentityTwo }       from './proof-of-identity-two'
import { Sidebar }                  from './sidebar'
import { AccountWillBeUsedFor }     from './store'
import { CountryOfBirth }           from './store'
import { CountryOfResidence }       from './store'
import { DateOfBirth }              from './store'
import { FirstName }                from './store'
import { LastName }                 from './store'
import { MiddleName }               from './store'
import { Nationality }              from './store'
import { ReasonsForOpening }        from './store'
import { Step }                     from './store'
import { useVerifyIdentity }        from './data'
import { useGetVerificationStatus } from './data'
import { accountWillBeUsedForVar }  from './store'
import { countryOfBirthVar }        from './store'
import { countryOfResidenceVar }    from './store'
import { dateOfBirthVar }           from './store'
import { firstNameVar }             from './store'
import { lastNameVar }              from './store'
import { middleNameVar }            from './store'
import { nationalityVar }           from './store'
import { reasonsForOpeningVar }     from './store'
import { stepVar }                  from './store'

const ProgressRenderer = () => {
  const step = useReactiveVar<Step>(stepVar)

  return (
    <Progress
      items={[
        Step.BASIC_INFORMATION,
        Step.ADDRESS,
        Step.PROOF_OF_IDENTITY_1,
        Step.PROOF_OF_IDENTITY_2,
        Step.PROOF_OF_ADDRESS,
        Step.DATA_VERIFICATION,
      ]}
      active={step}
    />
  )
}
const KYC: FC = () => {
  const step = useReactiveVar<Step>(stepVar)
  const [verifyIdentity, externalUserId] = useVerifyIdentity()

  const firstName = useReactiveVar<FirstName>(firstNameVar)
  const lastName = useReactiveVar<LastName>(lastNameVar)
  const middleName = useReactiveVar<MiddleName>(middleNameVar)
  const dateOfBirth = useReactiveVar<DateOfBirth>(dateOfBirthVar)
  const nationality = useReactiveVar<Nationality>(nationalityVar)
  const countryOfBirth = useReactiveVar<CountryOfBirth>(countryOfBirthVar)
  const countryOfResidence = useReactiveVar<CountryOfResidence>(countryOfResidenceVar)
  const reasonsForOpening = useReactiveVar<ReasonsForOpening>(reasonsForOpeningVar)
  const accountWillBeUsedFor = useReactiveVar<AccountWillBeUsedFor>(accountWillBeUsedForVar)

  return (
    <KYCLayout>
      <Row display={['flex', 'flex', 'none']}>
        <Layout flexBasis={19} />
        <ProgressRenderer />
        <Layout flexBasis={19} />
      </Row>
      <Box width={['100%', '100%', 1120]} height={['auto', 'auto', 872]}>
        <Sidebar>
          <ProgressRenderer />
        </Sidebar>
        <Box width={['100%', '100%', 736]} height='100%' border='soft'>
          <Condition match={step === Step.BASIC_INFORMATION}>
            <BasicInformation
              onSubmit={() => {
                verifyIdentity({
                  variables: {
                    firstName,
                    lastName,
                    middleName,
                    dateOfBirth,
                    nationality,
                    countryOfBirth,
                    countryOfResidence,
                    reasonsForOpeningAnAccount: reasonsForOpening,
                    accountWillBeUsedFor,
                  },
                })
              }}
              nextStep={Step.ADDRESS}
            />
          </Condition>
          <Condition match={step === Step.ADDRESS}>
            <Address prevStep={Step.BASIC_INFORMATION} nextStep={Step.PROOF_OF_IDENTITY_1} />
          </Condition>
          <Condition match={step === Step.PROOF_OF_IDENTITY_1}>
            <ProofOfIdentityOne prevStep={Step.ADDRESS} nextStep={Step.PROOF_OF_IDENTITY_2} />
          </Condition>
          <Condition match={step === Step.PROOF_OF_IDENTITY_2}>
            <ProofOfIdentityTwo
              prevStep={Step.PROOF_OF_IDENTITY_1}
              nextStep={Step.PROOF_OF_ADDRESS}
            />
          </Condition>
          <Condition match={step === Step.PROOF_OF_ADDRESS}>
            <ProofOfAddress prevStep={Step.PROOF_OF_IDENTITY_2} nextStep={Step.DATA_VERIFICATION} />
          </Condition>
          <Condition match={step === Step.DATA_VERIFICATION}>
            <DataVerification externalUserId={externalUserId} />
          </Condition>
        </Box>
      </Box>
    </KYCLayout>
  )
}

export { KYC }
