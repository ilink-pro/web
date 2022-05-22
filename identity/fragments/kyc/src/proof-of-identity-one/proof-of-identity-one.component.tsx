import { Button }                  from '@ilink-ui-proto/button'
import { useReactiveVar }          from '@apollo/client'

import Cookie                      from 'js-cookie'
import React                       from 'react'
import { FC }                      from 'react'
import { FormattedMessage }        from 'react-intl'

import { Box }                     from '@ui/layout'
import { Layout }                  from '@ui/layout'
import { Column }                  from '@ui/layout'
import { Row }                     from '@ui/layout'
import { Text }                    from '@ui/text'
import { Space }                   from '@ui/text'

import { DocumentType }            from '../store'
import { FrontSide }               from '../store'
import { BackSide }                from '../store'
import { ProofOfIdentityOneProps } from './proof-of-identity-one.interfaces'
import { useAddIdDocument }        from '../data'
import { stepVar }                 from '../store'
import { documentTypeVar }         from '../store'
import { frontSideVar }            from '../store'
import { backSideVar }             from '../store'

const ProofOfIdentityOne: FC<ProofOfIdentityOneProps> = ({ prevStep, nextStep }) => {
  const [addIdDocument, data, loading] = useAddIdDocument()

  const documentType = useReactiveVar<DocumentType>(documentTypeVar)
  const frontSide = useReactiveVar<FrontSide>(frontSideVar)
  const backSide = useReactiveVar<BackSide>(backSideVar)

  return (
    <Box width={['100%', '100%', 736]} backgroundColor='background.white'>
      <Layout flexBasis={40} />
      <Column fill>
        <Layout flexBasis={40} />
        <Layout>
          <Text fontSize='huge' fontWeight='bold'>
            <FormattedMessage id='kyc.proof_your_identity' defaultMessage='Proof your identity' />
            <Space />
            <Text fontSize='semiGiant' fontWeight='bold' color='text.accent'>
              <FormattedMessage id='kyc.step_1' defaultMessage='Step 1' />
            </Text>
          </Text>
        </Layout>
        <Layout flexBasis={32} />
        <Layout>
          <Text fontSize='semiGiant' fontWeight='bold'>
            <FormattedMessage
              id='kyc.upload_a_picture_of_your_id_document'
              defaultMessage='Upload a picture of your ID document'
            />
          </Text>
        </Layout>
        <Layout flexBasis={12} />
        <Row>
          <Layout alignItems='center'>
            {/* TODO use ui */}
            <input
              name='type'
              type='radio'
              value={DocumentType.PASSPORT}
              onChange={(event) => documentTypeVar(event.target.value as DocumentType)}
            />
            <Layout flexBasis={8} />
            <Text fontSize='default' fontWeight='medium' whiteSpace='nowrap'>
              <FormattedMessage id='kyc.passport' defaultMessage='Passport' />
            </Text>
          </Layout>
          <Layout flexBasis={31} />
          <Layout alignItems='center'>
            {/* TODO use ui */}
            <input
              name='type'
              type='radio'
              value={DocumentType.ID_CARD}
              onChange={(event) => documentTypeVar(event.target.value as DocumentType)}
            />
            <Layout flexBasis={8} />
            <Text fontSize='default' fontWeight='medium' whiteSpace='nowrap'>
              <FormattedMessage id='kyc.id_card' defaultMessage='ID card' />
            </Text>
          </Layout>
          <Layout flexBasis={31} />
          <Layout alignItems='center'>
            {/* TODO use ui */}
            <input
              name='type'
              type='radio'
              value={DocumentType.RESIDENCE_PERMIT}
              onChange={(event) => documentTypeVar(event.target.value as DocumentType)}
            />
            <Layout flexBasis={8} />
            <Text fontSize='default' fontWeight='medium' whiteSpace='nowrap'>
              <FormattedMessage id='kyc.residence_permit' defaultMessage='Residence permit' />
            </Text>
          </Layout>
        </Row>
        <Layout flexBasis={36} />
        <Layout alignItems='center'>
          <Text>Front Side:</Text>
          <Layout flexBasis={8} />
          <input
            type='file'
            onChange={({ target }) => frontSideVar(target.files ? target.files[0] : undefined)}
          />
        </Layout>
        <Layout flexBasis={36} />
        <Layout alignItems='center'>
          <Text>Back Side:</Text>
          <Layout flexBasis={8} />
          <input
            type='file'
            onChange={({ target }) => backSideVar(target.files ? target.files[0] : undefined)}
          />
        </Layout>
        <Layout flexBasis={40} flexGrow={1} />
        <Layout width={['100%', '100%', 254]} flexDirection={['column', 'column', 'row']}>
          <Row>
            <Button
              variant={'secondary' as any}
              size='large'
              style={{ width: '100%' }}
              onClick={() => stepVar(prevStep)}
            >
              <FormattedMessage id='kyc.back' defaultMessage='Back' />
            </Button>
          </Row>
          <Layout flexBasis={[16, 16, 12]} />
          <Row>
            <Button
              disabled={loading}
              size='large'
              style={{ width: '100%' }}
              onClick={() => {
                const fsBytesPromise = new Promise((resolve) => {
                  const reader = new FileReader()

                  reader.readAsBinaryString(frontSide!)
                  reader.addEventListener('load', (bytes) => resolve(bytes?.target?.result))
                })

                const bsBytesPromise = new Promise((resolve) => {
                  const reader = new FileReader()

                  reader.readAsBinaryString(backSide!)
                  reader.addEventListener('load', (bytes) => resolve(bytes?.target?.result))
                })

                fsBytesPromise.then((fsBytes) => {
                  bsBytesPromise.then((bsBytes) => {
                    addIdDocument({
                      variables: {
                        id: Cookie.get('applicantId'),
                        type: documentType,
                        frontSide: fsBytes,
                        backSide: bsBytes,
                      },
                    }).then(() => stepVar(nextStep))
                  })
                })
              }}
            >
              <FormattedMessage id='kyc.next' defaultMessage='Next' />
            </Button>
          </Row>
        </Layout>
        <Layout flexBasis={40} />
      </Column>
      <Layout flexBasis={40} />
    </Box>
  )
}

export { ProofOfIdentityOne }
