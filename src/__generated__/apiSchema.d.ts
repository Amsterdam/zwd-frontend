declare namespace Components {
    namespace Schemas {
        export interface BpmnModel {
            version: string;
            file_name: string;
            model: string;
        }
        export interface Case {
            id: number;
            description?: string | null;
            workflows: CaseWorkflow[];
            homeowner_association: string | null;
        }
        export interface CaseCreate {
            description?: string | null;
            advice_type?: string | null;
            homeowner_association?: number | null;
        }
        export interface CaseEvent {
            id: number;
            event_values: {
                [name: string]: any;
            };
            event_variables: {
                [name: string]: any;
            };
            date_created: string; // date-time
            type: /**
             * * `CASE` - CASE
             * * `CASE_CLOSE` - CASE_CLOSE
             * * `GENERIC_TASK` - GENERIC_TASK
             */
            TypeEnum;
            emitter_id: number;
            case: number;
        }
        export interface CaseUserTask {
            id: number;
            task_id: string; // uuid
            task_name: string;
            name: string;
            form?: any;
            roles?: string[] | null;
            due_date: string; // date-time
            owner?: number | null;
            created: string; // date-time
            updated: string; // date-time
            completed?: boolean;
            case: number;
            homeowner_association: string | null;
        }
        export interface CaseWorkflow {
            id: number;
            case?: number | null;
            workflow_type?: string | null;
            workflow_version?: string | null;
            workflow_theme_name?: string | null;
            workflow_message_name?: string | null;
            data?: null;
            tasks: CaseUserTask[];
        }
        export interface GenericCompletedTaskCreate {
            id: number;
            case_user_task_id: string;
            case: number;
            variables: any;
            description?: string;
            date_added: string; // date-time
        }
        export interface HomeownerAssociation {
            id: number;
            name: string;
            build_year: number;
            number_of_appartments: number;
            message?: string | null;
        }
        /**
         * * `CASE` - CASE
         * * `CASE_CLOSE` - CASE_CLOSE
         * * `GENERIC_TASK` - GENERIC_TASK
         */
        export type TypeEnum = "CASE" | "CASE_CLOSE" | "GENERIC_TASK";
    }
}
declare namespace Paths {
    namespace AddressHomeownerAssociationRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace ApiSchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
            export type Lang = "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "ckb" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "ms" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "ug" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            lang?: Parameters.Lang;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
        }
    }
    namespace BpmnModelsFileRetrieve {
        namespace Parameters {
            export type ModelName = string; // ^[^/]+$
            export type Version = string; // ^[^/]+$
        }
        export interface PathParameters {
            model_name: Parameters.ModelName /* ^[^/]+$ */;
            version: Parameters.Version /* ^[^/]+$ */;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace BpmnModelsList {
        namespace Responses {
            export type $200 = string[];
        }
    }
    namespace BpmnModelsList2 {
        namespace Parameters {
            export type ModelName = string; // ^[^/]+$
        }
        export interface PathParameters {
            model_name: Parameters.ModelName /* ^[^/]+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BpmnModel[];
        }
    }
    namespace CasesCreate {
        export type RequestBody = Components.Schemas.CaseCreate;
        namespace Responses {
            export type $201 = Components.Schemas.CaseCreate;
        }
    }
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesList {
        namespace Responses {
            export type $200 = Components.Schemas.Case[];
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesWorkflowsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace GenericTasksCompleteCreate {
        export type RequestBody = Components.Schemas.GenericCompletedTaskCreate;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TasksList {
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTask[];
        }
    }
    namespace TasksRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTask;
        }
    }
}
