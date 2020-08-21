import { Client } from '@widgetbot/embed-api'
import * as React from 'react'

import { Embed, Root } from './elements'
import { generateUUID, searchParams } from './util'

export interface Props {
    server?: string
    channel?: string
    shard?: string

    defer?: boolean

    className?: string
    onAPI?: (api: Client) => void

    style?: React.CSSProperties
    height?: number
    width?: number
    focusable?: boolean

    options?: { [key: string]: string }
}

export default class WidgetBot extends React.PureComponent<Props> {
  static defaultProps: Props = {
    server: '299881420891881473',
    shard: 'https://e.widgetbot.io',
    options: {},
    defer: true,
    focusable: true
  }

    state = {
        url: null,
        id: generateUUID()
    }

    api = new Client({
        id: this.state.id,
        iframe: null
    })

    static getDerivedStateFromProps(props: Props, state) {
        const url = `${props.shard}/channels/${props.server}${
            props.channel ? `/${props.channel}` : ''
        }/${searchParams({
            ...props.options,
            api: state.id
        })}`

        return { url }
    }

    componentDidMount() {
        const { onAPI } = this.props

        if (onAPI) onAPI(this.api)
    }

    render() {
        const { defer, className, style, height, width, focusable } = this.props

        return (
            <div
                className={className}
                style={{ ...Root({ width, height }), ...style }}
            >
                <iframe
                    src={defer ? '' : this.state.url}
                    ref={ref => (this.api.iframe = ref)}
                    style={Embed}
                    tabIndex={focusable ? null : -1}
                    title="Discord chat embed"
                />
            </div>
        )
    }
}
