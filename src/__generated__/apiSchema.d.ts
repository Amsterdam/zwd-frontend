declare namespace Components {
    namespace Schemas {
        /**
         * * `Energieadvies` - ENERGY_ADVICE
         * * `Haalbaarheidsonderzoek` - HBO
         * * `Cursus` - COURSE
         */
        export type AdviceTypeEnum = "Energieadvies" | "Haalbaarheidsonderzoek" | "Cursus";
        export interface BpmnModel {
            version: string;
            file_name: string;
            model: string;
        }
        export interface Case {
            id: number;
            created: string; // date-time
            end_date: string; // date
            description?: string | null;
            workflows: CaseWorkflow[];
            advice_type?: /**
             * * `Energieadvies` - ENERGY_ADVICE
             * * `Haalbaarheidsonderzoek` - HBO
             * * `Cursus` - COURSE
             */
            AdviceTypeEnum;
            homeowner_association: CaseHomeownerAssociation;
            legacy_id?: string | null;
            status: string;
            prefixed_dossier_id: string;
        }
        export interface CaseAdvisor {
            id: number;
            name: string;
        }
        export interface CaseCreate {
            id: number;
            description?: string | null;
            advice_type?: /**
             * * `Energieadvies` - ENERGY_ADVICE
             * * `Haalbaarheidsonderzoek` - HBO
             * * `Cursus` - COURSE
             */
            AdviceTypeEnum;
            homeowner_association?: number | null;
            contacts?: Contact[];
            legacy_id?: string | null;
        }
        export interface CaseDocument {
            id: number;
            case: number;
            document: string; // uri
            name: string;
            created: string; // date-time
        }
        export interface CaseDocumentNameUpdate {
            name: string;
        }
        export interface CaseDocumentWithTask {
            id: number;
            case: number;
            document: string; // uri
            name: string;
            created: string; // date-time
            case_user_task_id?: string | null;
        }
        export interface CaseEvent {
            id: number;
            event_values: {
                [name: string]: any;
            };
            event_variables: {
                [name: string]: any;
            };
            created: string; // date-time
            type: /**
             * * `CASE` - CASE
             * * `CASE_CLOSE` - CASE_CLOSE
             * * `GENERIC_TASK` - GENERIC_TASK
             */
            TypeEnum;
            emitter_id: number;
            case: number;
        }
        export interface CaseHomeownerAssociation {
            id: number;
            name: string;
        }
        export interface CaseList {
            id: number;
            created: string; // date-time
            homeowner_association: CaseHomeownerAssociation;
            legacy_id?: string | null;
            status: string;
            end_date?: string | null; // date
            prefixed_dossier_id: string;
        }
        export interface CaseStatus {
            name: string;
        }
        export interface CaseUserTask {
            id: number;
            task_id: string; // uuid
            task_name: string;
            name: string;
            form?: null;
            roles?: string[] | null;
            due_date: string; // date-time
            owner?: number | null;
            created: string; // date-time
            updated: string; // date-time
            completed?: boolean;
            case: number;
            homeowner_association: string;
            initiated_by: string;
            /**
             * Indicates whether this task requires review by another user.
             */
            requires_review?: boolean;
        }
        export interface CaseUserTaskList {
            id: number;
            name: string;
            case: number;
            homeowner_association: string;
            created: string; // date-time
        }
        export interface CaseWorkflow {
            id: number;
            case?: number | null;
            tasks: CaseUserTask[];
            completed?: boolean;
        }
        export interface Contact {
            fullname: string;
            email: string; // email
            phone: string;
            role: string;
            id: number;
        }
        export interface District {
            id: number;
            name: string;
            neighborhoods: Neighborhood[];
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
            contacts: Nested[];
            owners?: Owner[];
            district: string;
            neighborhood: string;
            wijk: string;
            zip_code?: string | null;
            is_small: boolean;
            monument_status?: string | null;
            ligt_in_beschermd_gebied?: string | null;
            beschermd_stadsdorpsgezicht?: string | null;
            is_priority_neighborhood: boolean;
        }
        export interface Neighborhood {
            id: number;
            name: string;
        }
        export interface Nested {
            id: number;
            email: string; // email
            phone: string;
            fullname: string;
            role: string;
            homeowner_associations?: number[];
        }
        export interface Owner {
            type: string;
            name?: string | null;
            number_of_appartments: number;
        }
        export interface PaginatedCaseListList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results: CaseList[];
        }
        export interface PaginatedCaseStatusList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: CaseStatus[];
        }
        export interface PaginatedCaseUserTaskListList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results: CaseUserTaskList[];
        }
        export interface PaginatedDistrictList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: District[];
        }
        export interface PaginatedHomeownerAssociationList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: HomeownerAssociation[];
        }
        export interface PaginatedNeighborhoodList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: Neighborhood[];
        }
        export interface PaginatedWijkList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: Wijk[];
        }
        export interface PatchedCaseDocumentNameUpdate {
            name?: string;
        }
        export interface PatchedUpdateCaseAdvisor {
            advisor?: number;
        }
        export interface StartWorkflow {
            workflow_option_id: number;
        }
        /**
         * * `CASE` - CASE
         * * `CASE_CLOSE` - CASE_CLOSE
         * * `GENERIC_TASK` - GENERIC_TASK
         */
        export type TypeEnum = "CASE" | "CASE_CLOSE" | "GENERIC_TASK";
        export interface Wijk {
            id: number;
            name: string;
        }
        export interface WorkflowOption {
            id: number;
            name: string;
            message_name: string;
        }
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
    namespace CaseStatusesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStatusList;
        }
    }
    namespace CaseStatusesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseStatus;
        }
    }
    namespace CasesAdvisorPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedUpdateCaseAdvisor;
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace CasesAdvisorsList {
        namespace Parameters {
            export type Closed = boolean;
            export type District = string[];
            export type HomeownerAssociationName = string;
            export type Id = number;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Status = number[];
            export type Wijk = string[];
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            closed?: Parameters.Closed;
            district?: Parameters.District;
            homeowner_association_name?: Parameters.HomeownerAssociationName;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseAdvisor[];
        }
    }
    namespace CasesCreate {
        export type RequestBody = Components.Schemas.CaseCreate;
        namespace Responses {
            export type $201 = Components.Schemas.CaseCreate;
        }
    }
    namespace CasesDocumentsCreate {
        export type RequestBody = Components.Schemas.CaseDocument;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace CasesDocumentsDestroy {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CasesDocumentsDownloadRetrieve {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesDocumentsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace CasesDocumentsUpdateNamePartialUpdate {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCaseDocumentNameUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocumentNameUpdate;
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
    namespace CasesLegacyRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseList;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type Closed = boolean;
            export type District = string[];
            export type HomeownerAssociationName = string;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type Status = string[];
            export type Wijk = string[];
        }
        export interface QueryParameters {
            closed?: Parameters.Closed;
            district?: Parameters.District;
            homeowner_association_name?: Parameters.HomeownerAssociationName;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseListList;
        }
    }
    namespace CasesProcessesList {
        namespace Parameters {
            export type Closed = boolean;
            export type District = string[];
            export type HomeownerAssociationName = string;
            export type Id = number;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Status = number[];
            export type Wijk = string[];
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            closed?: Parameters.Closed;
            district?: Parameters.District;
            homeowner_association_name?: Parameters.HomeownerAssociationName;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowOption[];
        }
    }
    namespace CasesProcessesStartCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Case;
        namespace Responses {
            export type $200 = Components.Schemas.StartWorkflow;
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
    namespace DistrictsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDistrictList;
        }
    }
    namespace DistrictsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.District;
        }
    }
    namespace GenericTasksCompleteCreate {
        export type RequestBody = Components.Schemas.GenericCompletedTaskCreate;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GenericTasksCompleteFileTaskCreate {
        export type RequestBody = Components.Schemas.CaseDocumentWithTask;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocumentWithTask;
        }
    }
    namespace HomeownerAssociationCasesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseList;
        }
    }
    namespace HomeownerAssociationContactsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationContactsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.HomeownerAssociation;
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationDeleteContactDestroy {
        namespace Parameters {
            export type ContactId = string;
            export type Id = number;
        }
        export interface PathParameters {
            contact_id: Parameters.ContactId;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace HomeownerAssociationList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedHomeownerAssociationList;
        }
    }
    namespace HomeownerAssociationPriorityZipcodeCreate {
        export type RequestBody = Components.Schemas.HomeownerAssociation;
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationSearchRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace NeighborhoodsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedNeighborhoodList;
        }
    }
    namespace NeighborhoodsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Neighborhood;
        }
    }
    namespace TasksList {
        namespace Parameters {
            export type District = string[];
            export type HomeownerAssociationName = string;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type Status = string[];
            export type Wijk = string[];
        }
        export interface QueryParameters {
            district?: Parameters.District;
            homeowner_association_name?: Parameters.HomeownerAssociationName;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseUserTaskListList;
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
            export type $200 = Components.Schemas.CaseUserTaskList;
        }
    }
    namespace WijkenList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedWijkList;
        }
    }
    namespace WijkenRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Wijk;
        }
    }
}
