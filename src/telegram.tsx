import { Client } from '@widgetbot/embed-api'
import * as React from 'react'

import { Embed, Root } from './elements'
import { generateUUID, searchParams } from './util'

export interface TelegramProps {
    chat?: string
    topic?: string
    // Required: URL of the deployed Telegram widget host (no default).
    shard: string

    token?: string
    settingsGroup?: string

    defer?: boolean

    className?: string
    onAPI?: (api: Client) => void

    style?: React.CSSProperties
    height?: number | string
    width?: number | string
    focusable?: boolean

    options?: { [key: string]: string }
}

export default class TelegramWidget extends React.PureComponent<TelegramProps> {
    static defaultProps: Partial<TelegramProps> = {
        options: {},
        defer: false,
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

    static getDerivedStateFromProps(props: TelegramProps, state) {
        if (!props.shard) {
            throw new Error(
                '<TelegramWidget> requires a `shard` prop pointing at the widget host.'
            )
        }
        let shard = props.shard
        if (!shard.startsWith('http')) shard = `https://${shard}`
        if (shard.endsWith('/')) shard = shard.substring(0, shard.length - 1)

        let params: { [key: string]: string | number | boolean } = {
            ...props.options,
            api: state.id
        }
        if (props.token) params.token = props.token
        if (props.settingsGroup) params['settings-group'] = props.settingsGroup

        const path = props.chat
            ? `/channels/${props.chat}${props.topic ? `/${props.topic}` : ''}`
            : ''
        const url = `${shard}${path}${searchParams(params)}`

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
                style={{
                    ...Root({ width, height }),
                    backgroundColor: 'rgb(23, 33, 43)',
                    ...style
                }}
            >
                <iframe
                    src={defer ? '' : this.state.url}
                    ref={ref => (this.api.iframe = ref)}
                    style={Embed}
                    tabIndex={focusable ? null : -1}
                    allow="clipboard-write; fullscreen"
                    title="Telegram chat embed"
                />
            </div>
        )
    }
}
